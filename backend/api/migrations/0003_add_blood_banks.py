from django.db import migrations

def add_blood_banks(apps, schema_editor):
    BloodBank = apps.get_model('api', 'BloodBank')
    
    blood_banks = [
        {
            'name': 'Rashtrotthana Blood Centre',
            'address': 'Vidya Nagar, Neeligin Road',
            'timing': '9 AM – 6 PM (Mon–Sat)',
            'phone': '0836-2360204',
            'is_24x7': False,
            'is_government': False
        },
        {
            'name': 'KCTRI Blood Bank',
            'address': 'Navanagar, Hubli',
            'timing': '9 AM – 6 PM (Mon–Sat)',
            'phone': '0836-2232021',
            'is_24x7': False,
            'is_government': False
        },
        {
            'name': 'Hubli Lions Blood Bank',
            'address': 'Vivekananda General Hospital Campus, Deshpande Nagar',
            'timing': 'Open 24×7',
            'phone': '0836-4253366',
            'is_24x7': True,
            'is_government': False
        },
        {
            'name': 'Suchirayu Blood Bank',
            'address': 'Suchirayu Hospital, Gokul Road',
            'timing': '9 AM – 5 PM (Mon–Sat)',
            'phone': '0836-2332000',
            'is_24x7': False,
            'is_government': False
        },
        {
            'name': 'Jeevanavar Blood Bank',
            'address': 'Gokul Road, Opp. KSRTC Depot',
            'timing': 'Not specified',
            'phone': '0836-2230892',
            'is_24x7': False,
            'is_government': False
        },
        {
            'name': 'M. R. Diagnostics & Blood Bank',
            'address': 'Traffic Island, Near Lamington Road',
            'timing': 'Not specified',
            'phone': '0836-4266222',
            'is_24x7': False,
            'is_government': False
        },
        {
            'name': 'Life Line 24x7 Blood Bank',
            'address': 'Gokul Road / New Bus Stand Area',
            'timing': 'Open 24×7',
            'phone': 'Varies by branch',
            'is_24x7': True,
            'is_government': False
        },
        {
            'name': 'KIMS Blood Bank',
            'address': 'KIMS Campus, Vidyanagar',
            'timing': 'Government-run blood bank',
            'phone': '0836-2370047',
            'is_24x7': False,
            'is_government': True
        },
        {
            'name': 'South Central Railway Hospital Blood Bank',
            'address': 'Railway Hospital, Hubli South',
            'timing': 'For railway employees & public use in emergencies',
            'phone': 'Not specified',
            'is_24x7': False,
            'is_government': True
        },
        {
            'name': 'Hitech Pathology & Blood Bank',
            'address': 'Near Unkal Cross, Gokul Road',
            'timing': 'Not specified',
            'phone': 'As listed on local directories',
            'is_24x7': False,
            'is_government': False
        }
    ]
    
    for bank in blood_banks:
        BloodBank.objects.create(**bank)

def remove_blood_banks(apps, schema_editor):
    BloodBank = apps.get_model('api', 'BloodBank')
    BloodBank.objects.all().delete()

class Migration(migrations.Migration):
    dependencies = [
        ('api', '0002_bloodbank'),
    ]

    operations = [
        migrations.RunPython(add_blood_banks, remove_blood_banks),
    ] 