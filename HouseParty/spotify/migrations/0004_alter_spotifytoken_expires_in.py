# Generated by Django 5.1.3 on 2024-11-19 19:57

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('spotify', '0003_alter_spotifytoken_expires_in_vote'),
    ]

    operations = [
        migrations.AlterField(
            model_name='spotifytoken',
            name='expires_in',
            field=models.DateTimeField(default=datetime.datetime(2024, 11, 19, 19, 57, 7, 864713, tzinfo=datetime.timezone.utc)),
        ),
    ]