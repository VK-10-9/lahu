from django.db import migrations, models
import django.db.models.deletion

class Migration(migrations.Migration):
    dependencies = [
        ('api', '0003_add_blood_banks'),
    ]

    operations = [
        migrations.AddField(
            model_name='donation',
            name='blood_bank',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='donations', to='api.bloodbank'),
            preserve_default=False,
        ),
    ] 