from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
from .models import Donation
from api.blood_calculator_wrapper import BloodCalculator
import json

# Initialize the blood calculator
blood_calculator = BloodCalculator()

@csrf_exempt
@require_http_methods(["POST"])
def check_compatibility(request):
    try:
        data = json.loads(request.body)
        donor = data.get('donor')
        recipient = data.get('recipient')
        
        if not donor or not recipient:
            return JsonResponse({'error': 'Donor and recipient blood groups are required'}, status=400)
            
        result = blood_calculator.check_compatibility(donor, recipient)
        return JsonResponse(result)
        
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

@csrf_exempt
@require_http_methods(["POST"])
def search_donations(request):
    try:
        data = json.loads(request.body)
        
        # Get all donations from the database
        donations = list(Donation.objects.values(
            'blood_group', 'units', 'donor_name', 'date', 'location', 'is_available'
        ))
        
        # Convert date objects to strings
        for donation in donations:
            donation['date'] = donation['date'].isoformat()
        
        # Search using the blood calculator
        result = blood_calculator.search_donations(
            donations=donations,
            blood_group=data.get('blood_group'),
            location=data.get('location'),
            date_range=data.get('date_range'),
            available_only=data.get('available_only', True)
        )
        
        return JsonResponse(result)
        
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

@csrf_exempt
@require_http_methods(["POST"])
def calculate_availability(request):
    try:
        # Get all donations from the database
        donations = list(Donation.objects.values(
            'blood_group', 'units', 'is_available'
        ))
        
        # Calculate availability using the blood calculator
        result = blood_calculator.calculate_availability(donations)
        return JsonResponse(result)
        
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500) 