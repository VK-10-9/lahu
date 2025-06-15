from django.urls import path
from . import views

urlpatterns = [
    # ... existing urls ...
    path('api/check-compatibility/', views.check_compatibility, name='check_compatibility'),
    path('api/search-donations/', views.search_donations, name='search_donations'),
    path('api/calculate-availability/', views.calculate_availability, name='calculate_availability'),
] 