# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2019-03-21 22:09
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hfl', '0016_auto_20180619_1944'),
    ]

    operations = [
        migrations.AlterField(
            model_name='listing',
            name='status',
            field=models.CharField(blank=True, choices=[(b'Available', b'Available'), (b'Under Contract', b'Under Contract'), (b'Sold', b'Sold'), (b'Leased', b'Leased'), (b'Draft', b'Draft')], default=b'Available', max_length=20),
        ),
    ]
