# Generated by Django 4.0 on 2021-12-22 15:58

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('classes', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='schoolclass',
            name='grade',
            field=models.PositiveIntegerField(default=3, unique=True, validators=[django.core.validators.MinValueValidator(1), django.core.validators.MaxValueValidator(11)]),
            preserve_default=False,
        ),
        migrations.DeleteModel(
            name='SchoolClassGrade',
        ),
    ]