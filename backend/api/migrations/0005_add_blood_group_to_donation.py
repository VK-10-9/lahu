from django.db import migrations, models

class Migration(migrations.Migration):
    dependencies = [
        ('api', '0004_add_blood_bank_to_donation'),
    ]

    operations = [
        migrations.AddField(
            model_name='donation',
            name='blood_group',
            field=models.CharField(max_length=5),
            preserve_default=False,
        ),
    ] 