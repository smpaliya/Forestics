# Generated by Django 5.1 on 2024-10-21 03:21

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app1', '0009_userprofile'),
    ]

    operations = [
        migrations.AddField(
            model_name='articles',
            name='date',
            field=models.DateField(default=datetime.date.today),
        ),
    ]
