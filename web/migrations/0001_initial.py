# Generated by Django 5.2.4 on 2025-07-24 19:08

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='VerificationCode',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code', models.IntegerField(max_length=4)),
                ('phone_number', models.CharField(max_length=12)),
                ('valid_for', models.DateTimeField()),
            ],
        ),
    ]
