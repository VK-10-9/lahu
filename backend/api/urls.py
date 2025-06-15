from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views import (
    UserViewSet,
    UserProfileViewSet,
    DonorViewSet,
    LocationViewSet,
    DonationRequestViewSet,
    DonationViewSet,
    DonationHistoryViewSet,
    RegisterView,
    BloodBankViewSet
)

router = DefaultRouter()
router.register(r'users', UserViewSet, basename='user')
router.register(r'profiles', UserProfileViewSet, basename='profile')
router.register(r'donors', DonorViewSet, basename='donor')
router.register(r'locations', LocationViewSet, basename='location')
router.register(r'requests', DonationRequestViewSet, basename='request')
router.register(r'donations', DonationViewSet, basename='donation')
router.register(r'history', DonationHistoryViewSet, basename='history')
router.register(r'register', RegisterView, basename='register')
router.register(r'bloodbanks', BloodBankViewSet, basename='bloodbank')

urlpatterns = [
    path('', include(router.urls)),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
] 