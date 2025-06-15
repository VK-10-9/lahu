from django.db import models
from django.contrib.auth.models import User

class BloodBank(models.Model):
    name = models.CharField(max_length=200)
    address = models.TextField()
    contact_number = models.CharField(max_length=20)
    email = models.EmailField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    @classmethod
    def get_default_blood_bank(cls):
        blood_bank, created = cls.objects.get_or_create(
            name="Main Blood Bank",
            defaults={
                'address': "123 Main Street",
                'contact_number': "123-456-7890",
                'email': "main@bloodbank.com"
            }
        )
        return blood_bank.id

class Donation(models.Model):
    BLOOD_GROUPS = [
        ('A+', 'A+'),
        ('A-', 'A-'),
        ('B+', 'B+'),
        ('B-', 'B-'),
        ('AB+', 'AB+'),
        ('AB-', 'AB-'),
        ('O+', 'O+'),
        ('O-', 'O-'),
    ]

    donor_name = models.CharField(max_length=100)
    blood_group = models.CharField(max_length=3, choices=BLOOD_GROUPS)
    units = models.PositiveIntegerField()
    donation_date = models.DateField()
    location = models.CharField(max_length=200)
    is_available = models.BooleanField(default=True)
    blood_bank = models.ForeignKey(
        BloodBank, 
        on_delete=models.CASCADE,
        default=BloodBank.get_default_blood_bank
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.donor_name} - {self.blood_group} ({self.units} units)"

class DonationRequest(models.Model):
    BLOOD_GROUPS = [
        ('A+', 'A+'),
        ('A-', 'A-'),
        ('B+', 'B+'),
        ('B-', 'B-'),
        ('AB+', 'AB+'),
        ('AB-', 'AB-'),
        ('O+', 'O+'),
        ('O-', 'O-'),
    ]

    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
        ('completed', 'Completed'),
    ]

    requester = models.ForeignKey(User, on_delete=models.CASCADE)
    blood_group = models.CharField(max_length=3, choices=BLOOD_GROUPS)
    units = models.PositiveIntegerField()
    reason = models.TextField()
    hospital = models.CharField(max_length=200)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    blood_bank = models.ForeignKey(
        BloodBank, 
        on_delete=models.CASCADE,
        default=BloodBank.get_default_blood_bank
    )
    request_date = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.requester.username} - {self.blood_group} ({self.units} units)" 