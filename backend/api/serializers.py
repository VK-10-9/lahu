from rest_framework import serializers
from django.contrib.auth.models import User
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

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'phone', 'blood_group', 'is_donor', 'is_recipient', 'is_blood_bank')
        read_only_fields = ('id',)

class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = UserProfile
        fields = ('id', 'user', 'phone_number', 'date_of_birth', 'gender')
        read_only_fields = ('id',)

class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = ('id', 'latitude', 'longitude', 'address', 'city', 'state', 'country', 'postal_code')
        read_only_fields = ('id',)

class DonorSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    location = LocationSerializer(read_only=True)

    class Meta:
        model = Donor
        fields = (
            'id', 'user', 'blood_group', 'last_donation', 'is_available',
            'medical_conditions', 'weight', 'height', 'location'
        )
        read_only_fields = ('id', 'last_donation')

class BloodBankSerializer(serializers.ModelSerializer):
    class Meta:
        model = BloodBank
        fields = ['id', 'name', 'address', 'timing', 'phone', 'is_24x7', 'is_government']
        read_only_fields = ['id']

class DonationRequestSerializer(serializers.ModelSerializer):
    requester = UserSerializer(read_only=True)
    blood_bank = BloodBankSerializer(read_only=True)
    status = serializers.CharField(read_only=True)

    class Meta:
        model = DonationRequest
        fields = (
            'id', 'requester', 'blood_bank', 'blood_group', 'units', 'request_date', 'status', 'reason'
        )
        read_only_fields = ('id', 'request_date', 'status')

class DonationSerializer(serializers.ModelSerializer):
    blood_bank = BloodBankSerializer(read_only=True)
    donor = DonorSerializer(read_only=True)
    request = DonationRequestSerializer(read_only=True)
    status = serializers.CharField(read_only=True)

    class Meta:
        model = Donation
        fields = (
            'id', 'donor', 'request', 'blood_bank', 'blood_group', 'units', 'donation_date', 'status', 'notes'
        )
        read_only_fields = ('id', 'donation_date', 'status')

class DonationHistorySerializer(serializers.ModelSerializer):
    donation = DonationSerializer(read_only=True)

    class Meta:
        model = DonationHistory
        fields = (
            'id', 'donation', 'blood_volume', 'hemoglobin_level',
            'blood_pressure', 'pulse_rate', 'temperature'
        )
        read_only_fields = ('id',)

# Registration Serializers
class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    profile = UserProfileSerializer()
    donor = DonorSerializer(required=False)
    location = LocationSerializer(required=False)

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password', 'first_name', 'last_name', 'profile', 'donor', 'location')
        read_only_fields = ('id',)

    def create(self, validated_data):
        profile_data = validated_data.pop('profile')
        donor_data = validated_data.pop('donor', None)
        location_data = validated_data.pop('location', None)

        # Create User
        user = User.objects.create_user(**validated_data)

        # Create UserProfile
        UserProfile.objects.create(user=user, **profile_data)

        # Create Donor if data provided
        if donor_data:
            donor = Donor.objects.create(user=user, **donor_data)
            
            # Create Location if data provided
            if location_data:
                Location.objects.create(donor=donor, **location_data)

        return user 

class DonationLogSerializer(serializers.ModelSerializer):
    blood_bank = BloodBankSerializer(read_only=True)
    
    class Meta:
        model = DonationLog
        fields = ['id', 'blood_bank', 'blood_group', 'units', 'log_date', 'log_type']
        read_only_fields = ['id', 'log_date'] 