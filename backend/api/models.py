from django.db import models
from django.contrib.auth.models import User
from django.core.validators import RegexValidator, MinValueValidator
from django.utils import timezone

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phone_number = models.CharField(
        max_length=15,
        validators=[RegexValidator(r'^\+?1?\d{9,15}$')]
    )
    date_of_birth = models.DateField()
    gender = models.CharField(max_length=10, choices=[
        ('M', 'Male'),
        ('F', 'Female'),
        ('O', 'Other')
    ])
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.username}'s profile"

class Donor(models.Model):
    BLOOD_GROUPS = [
        ('A+', 'A Positive'),
        ('A-', 'A Negative'),
        ('B+', 'B Positive'),
        ('B-', 'B Negative'),
        ('AB+', 'AB Positive'),
        ('AB-', 'AB Negative'),
        ('O+', 'O Positive'),
        ('O-', 'O Negative'),
    ]

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    blood_group = models.CharField(max_length=3, choices=BLOOD_GROUPS)
    last_donation = models.DateField(null=True, blank=True)
    is_available = models.BooleanField(default=True)
    medical_conditions = models.TextField(blank=True, null=True)  # Store as comma-separated values
    weight = models.DecimalField(
        max_digits=5, 
        decimal_places=2,
        validators=[MinValueValidator(45.0)]  # Minimum weight for donation
    )
    height = models.DecimalField(max_digits=5, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        indexes = [
            models.Index(fields=['blood_group']),
            models.Index(fields=['is_available']),
            models.Index(fields=['last_donation']),
        ]

    def __str__(self):
        return f"{self.user.username} - {self.blood_group}"

    @property
    def medical_conditions_list(self):
        if self.medical_conditions:
            return [condition.strip() for condition in self.medical_conditions.split(',')]
        return []

class Location(models.Model):
    donor = models.OneToOneField(Donor, on_delete=models.CASCADE)
    latitude = models.DecimalField(max_digits=9, decimal_places=6)
    longitude = models.DecimalField(max_digits=9, decimal_places=6)
    address = models.TextField()
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    country = models.CharField(max_length=100)
    postal_code = models.CharField(max_length=20)

    def __str__(self):
        return f"{self.donor.user.username}'s location"

class DonationRequest(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
        ('completed', 'Completed'),
    ]

    requester = models.ForeignKey(User, on_delete=models.CASCADE, related_name='donation_requests')
    blood_bank = models.ForeignKey('BloodBank', on_delete=models.CASCADE, related_name='donation_requests')
    blood_group = models.CharField(max_length=5)
    units = models.PositiveIntegerField()
    request_date = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    reason = models.TextField()

    def __str__(self):
        return f"{self.requester.username} - {self.blood_group}"

class Donation(models.Model):
    STATUS_CHOICES = [
        ('scheduled', 'Scheduled'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    ]

    donor = models.ForeignKey(User, on_delete=models.CASCADE, related_name='donations')
    blood_bank = models.ForeignKey('BloodBank', on_delete=models.CASCADE, related_name='donations')
    blood_group = models.CharField(max_length=5)
    units = models.PositiveIntegerField()
    donation_date = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='scheduled')
    notes = models.TextField(blank=True)

    def __str__(self):
        return f"{self.donor.username} - {self.blood_group}"

class DonationHistory(models.Model):
    donor = models.ForeignKey(Donor, on_delete=models.CASCADE)
    donation = models.OneToOneField(Donation, on_delete=models.CASCADE)
    blood_volume = models.DecimalField(max_digits=5, decimal_places=2)
    hemoglobin_level = models.DecimalField(max_digits=4, decimal_places=1)
    blood_pressure = models.CharField(max_length=20)
    pulse_rate = models.IntegerField()
    temperature = models.DecimalField(max_digits=4, decimal_places=1)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"History for donation {self.donation.id}"

class BloodBank(models.Model):
    name = models.CharField(max_length=100)
    address = models.TextField()
    timing = models.CharField(max_length=100)
    phone = models.CharField(max_length=15)
    is_24x7 = models.BooleanField(default=False)
    is_government = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['name']

class DonationLog(models.Model):
    LOG_TYPE_CHOICES = [
        ('in', 'Blood In'),
        ('out', 'Blood Out'),
    ]

    blood_bank = models.ForeignKey(BloodBank, on_delete=models.CASCADE, related_name='donation_logs')
    blood_group = models.CharField(max_length=5)
    units = models.PositiveIntegerField()
    log_date = models.DateTimeField(auto_now_add=True)
    log_type = models.CharField(max_length=3, choices=LOG_TYPE_CHOICES)

    def __str__(self):
        return f"{self.blood_bank.name} - {self.blood_group} - {self.log_type}" 