from django.contrib import admin
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

@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'phone_number', 'date_of_birth', 'gender')
    search_fields = ('user__username', 'user__email', 'phone_number')

@admin.register(Donor)
class DonorAdmin(admin.ModelAdmin):
    list_display = ('user', 'blood_group', 'is_available', 'last_donation')
    list_filter = ('blood_group', 'is_available')
    search_fields = ('user__username', 'user__email')

@admin.register(Location)
class LocationAdmin(admin.ModelAdmin):
    list_display = ('donor', 'city', 'state', 'country')
    search_fields = ('donor__user__username', 'city', 'state', 'country')

# Remove custom admin for DonationRequest and Donation
admin.site.register(DonationRequest)
admin.site.register(Donation)

@admin.register(DonationHistory)
class DonationHistoryAdmin(admin.ModelAdmin):
    list_display = ('donor', 'blood_volume', 'hemoglobin_level', 'created_at')
    search_fields = ('donor__user__username',)

admin.site.register(BloodBank)
admin.site.register(DonationLog) 