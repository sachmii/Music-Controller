# Generated by Django 5.1.3 on 2024-11-13 17:44

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('spotify', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='spotifytoken',
            name='expires_in',
            field=models.DateTimeField(default=datetime.datetime(2024, 11, 13, 17, 44, 7, 813108, tzinfo=datetime.timezone.utc)),
        ),
    ]