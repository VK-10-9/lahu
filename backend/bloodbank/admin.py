from django.contrib import admin
from .models import BloodBank, Donation, DonationRequest

@admin.register(BloodBank)
class BloodBankAdmin(admin.ModelAdmin):
    list_display = ('name', 'contact_number', 'email', 'created_at')
    search_fields = ('name', 'email', 'contact_number')

@admin.register(Donation)
class DonationAdmin(admin.ModelAdmin):
    list_display = ('donor_name', 'blood_group', 'units', 'donation_date', 'location', 'is_available')
    list_filter = ('blood_group', 'is_available', 'donation_date')
    search_fields = ('donor_name', 'location')

@admin.register(DonationRequest)
class DonationRequestAdmin(admin.ModelAdmin):
    list_display = ('requester', 'blood_group', 'units', 'hospital', 'status', 'request_date')
    list_filter = ('blood_group', 'status', 'request_date')
    search_fields = ('requester__username', 'hospital', 'reason') 