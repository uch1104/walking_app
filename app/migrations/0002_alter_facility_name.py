# Generated by Django 3.2.6 on 2021-08-23 01:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='facility',
            name='name',
            field=models.CharField(help_text='名前', max_length=255, null=True, unique=True),
        ),
    ]
