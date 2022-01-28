# Generated by Django 3.2.9 on 2022-01-22 00:07

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Entite',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('reflex', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='children', to='iam.entite')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='entite', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Organization',
            fields=[
                ('entite_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='iam.entite')),
                ('org_name', models.CharField(max_length=12)),
                ('description', models.TextField(max_length=100)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
            bases=('iam.entite',),
        ),
        migrations.CreateModel(
            name='Person',
            fields=[
                ('entite_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='iam.entite')),
                ('person_name', models.CharField(max_length=12)),
                ('surname', models.CharField(max_length=12)),
                ('password', models.TextField(max_length=50)),
                ('email', models.EmailField(max_length=254)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
            bases=('iam.entite',),
        ),
        migrations.CreateModel(
            name='Resource',
            fields=[
                ('entite_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='iam.entite')),
                ('description', models.TextField(max_length=100)),
                ('name', models.CharField(default=None, max_length=12)),
                ('title', models.CharField(default=None, max_length=12)),
                ('price', models.IntegerField(default=None)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
            bases=('iam.entite',),
        ),
        migrations.CreateModel(
            name='Identite',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('identite_name', models.CharField(max_length=12)),
                ('description', models.TextField(max_length=100)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('identite_entite', models.ManyToManyField(blank=True, related_name='entite_identite', to='iam.Entite')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='identite', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Caracteristique',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('action', models.CharField(choices=[('POST', 'POST'), ('GET', 'GET'), ('PUT', 'PUT'), ('PATCH', 'PATCH'), ('DELETE', 'DELETE')], default='POST', max_length=12)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('carac_identite', models.ManyToManyField(related_name='identite_carac', to='iam.Identite')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='caracteristique', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
