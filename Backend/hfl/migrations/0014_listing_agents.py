# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2018-04-19 19:58
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hfl', '0013_auto_20180419_1909'),
    ]

    operations = [
        migrations.AddField(
            model_name='listing',
            name='agents',
            field=models.ManyToManyField(blank=True, null=True, related_name='agents', to='hfl.Agent'),
        ),
    ]
