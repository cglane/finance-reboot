# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2018-06-19 19:44
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hfl', '0015_auto_20180419_2000'),
    ]

    operations = [
        migrations.AddField(
            model_name='listing',
            name='html_description',
            field=models.TextField(blank=True, help_text=b'To manually edit the meta description field for a listing.', max_length=200),
        ),
        migrations.AddField(
            model_name='listing',
            name='html_title',
            field=models.TextField(blank=True, help_text=b'To manually edit the meta title field for a listing.', max_length=200),
        ),
    ]