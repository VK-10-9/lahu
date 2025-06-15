from rest_framework import viewsets, status, permissions
from rest_framework.decorators import action, api_view
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.db.models import F, FloatField, ExpressionWrapper
from django.db.models.functions import Radians, Cos, Sin, ATan2, Sqrt
from django_filters import rest_framework as filters
from .models import (
    UserProfile,
    Donor,
    Location,
    DonationRequest,
    Donation,
    DonationHistory,
    BloodBank,
    DonationLog
)
from .serializers import (
    UserSerializer,
    UserProfileSerializer,
    DonorSerializer,
    LocationSerializer,
    DonationRequestSerializer,
    DonationSerializer,
    DonationHistorySerializer,
    UserRegistrationSerializer,
    BloodBankSerializer,
    DonationLogSerializer
)
from .utils import check_blood_compatibility, calculate_blood_availability

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return User.objects.filter(id=self.request.user.id)

class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return UserProfile.objects.filter(user=self.request.user)

class DonorViewSet(viewsets.ModelViewSet):
    queryset = Donor.objects.all()
    serializer_class = DonorSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_fields = ['blood_group', 'is_available']

    def get_queryset(self):
        return Donor.objects.filter(user=self.request.user)

    @action(detail=False, methods=['get'])
    def nearby(self, request):
        try:
            latitude = float(request.query_params.get('latitude'))
            longitude = float(request.query_params.get('longitude'))
            radius_km = float(request.query_params.get('radius', 10))
        except (TypeError, ValueError):
            return Response(
                {'error': 'Invalid parameters'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Haversine formula for distance calculation
        R = 6371  # Earth's radius in kilometers

        # Convert to radians
        lat1 = Radians(latitude)
        lon1 = Radians(longitude)
        lat2 = Radians(F('location__latitude'))
        lon2 = Radians(F('location__longitude'))

        # Haversine formula
        dlat = lat2 - lat1
        dlon = lon2 - lon1
        a = Sin(dlat/2)**2 + Cos(lat1) * Cos(lat2) * Sin(dlon/2)**2
        c = 2 * ATan2(Sqrt(a), Sqrt(1-a))
        distance = R * c

        # Filter donors within radius
        nearby_donors = Donor.objects.annotate(
            distance=ExpressionWrapper(distance, output_field=FloatField())
        ).filter(
            location__isnull=False,
            distance__lte=radius_km
        ).order_by('distance')

        serializer = self.get_serializer(nearby_donors, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['post'])
    def contact(self, request, pk=None):
        donor = self.get_object()
        try:
            # Here you would typically implement the contact logic
            # For example, sending an email or notification
            return Response({
                'message': f'Contact request sent to {donor.user.get_full_name()}'
            }, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({
                'error': str(e)
            }, status=status.HTTP_400_BAD_REQUEST)

class LocationViewSet(viewsets.ModelViewSet):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Location.objects.filter(donor__user=self.request.user)

class DonationRequestViewSet(viewsets.ModelViewSet):
    queryset = DonationRequest.objects.all()
    serializer_class = DonationRequestSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_fields = ['blood_group', 'urgency_level', 'status']

    def get_queryset(self):
        return DonationRequest.objects.filter(requester=self.request.user)

    def perform_create(self, serializer):
        serializer.save(requester=self.request.user)

    @action(detail=True, methods=['post'])
    def check_compatibility(self, request, pk=None):
        donation_request = self.get_object()
        donor_blood_group = request.data.get('donor_blood_group')
        
        if not donor_blood_group:
            return Response(
                {'error': 'Donor blood group is required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            compatible = check_blood_compatibility(
                donor_blood_group,
                donation_request.blood_group
            )
            return Response({'compatible': compatible})
        except Exception as e:
            return Response(
                {'error': str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class DonationViewSet(viewsets.ModelViewSet):
    queryset = Donation.objects.all()
    serializer_class = DonationSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_fields = ['status']

    def get_queryset(self):
        return Donation.objects.filter(donor__user=self.request.user)

    def perform_create(self, serializer):
        donation = serializer.save()
        
        # Create a donation log entry
        DonationLog.objects.create(
            blood_bank=donation.blood_bank,
            blood_group=donation.blood_group,
            units=donation.units,
            log_type='in'
        )

    @action(detail=True, methods=['post'])
    def complete(self, request, pk=None):
        donation = self.get_object()
        if donation.status != 'SCHEDULED':
            return Response(
                {'error': 'Donation is not in scheduled state'},
                status=status.HTTP_400_BAD_REQUEST
            )

        donation.status = 'COMPLETED'
        donation.save()

        # Update donor's last donation date
        donor = donation.donor
        donor.last_donation = donation.completed_date
        donor.save()

        return Response(self.get_serializer(donation).data)

class DonationHistoryViewSet(viewsets.ModelViewSet):
    queryset = DonationHistory.objects.all()
    serializer_class = DonationHistorySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return DonationHistory.objects.filter(donor__user=self.request.user)

# Registration View
class RegisterView(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserRegistrationSerializer
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response(
            UserSerializer(user).data,
            status=status.HTTP_201_CREATED
        )

class BloodBankViewSet(viewsets.ModelViewSet):
    queryset = BloodBank.objects.all()
    serializer_class = BloodBankSerializer
    permission_classes = [permissions.AllowAny]

    @action(detail=True, methods=['get'])
    def availability(self, request, pk=None):
        blood_bank = self.get_object()
        donations = Donation.objects.filter(
            blood_bank=blood_bank,
            status='completed'
        ).values('blood_group', 'units')
        
        # Convert QuerySet to list of dicts
        donations_list = [
            {'blood_group': d['blood_group'], 'units': str(d['units'])}
            for d in donations
        ]
        
        try:
            availability = calculate_blood_availability(donations_list)
            return Response(availability)
        except Exception as e:
            return Response(
                {'error': str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

@api_view(['GET'])
def test_connection(request):
    return Response({
        'message': 'Backend connection successful',
        'status': 'ok'
    }, status=status.HTTP_200_OK) 