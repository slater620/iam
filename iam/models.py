from tkinter import N
from typing_extensions import Required
from django.contrib.auth.models import User
from django.db import models

# Create your models here.
class Entite(models.Model):
    user = models.ForeignKey(User, related_name='entite', on_delete=models.CASCADE)
    reflex = models.ForeignKey('self', null=True, related_name='children', on_delete=models.CASCADE)

class Person(Entite): 
    person_name = models.CharField(max_length=12)
    surname = models.CharField(max_length=12)
    password = models.TextField(max_length=50)
    email = models.EmailField()
    created_at = models.DateTimeField(auto_now_add=True)
    update_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['created_at']
 
class Organization(Entite):
    org_name= models.CharField(max_length=12)
    description = models.TextField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    update_at = models.DateTimeField(auto_now=True)
    class Meta:
        ordering = ['created_at']

class Resource(Entite):
    description = models.TextField(max_length=100)
    name = models.CharField(max_length=12 , default=None)
    title = models.CharField(max_length=12 , default=None)
    price = models.IntegerField(default=None)    
    created_at = models.DateTimeField(auto_now_add=True)
    update_at = models.DateTimeField(auto_now=True)
    class Meta:
        ordering = ['created_at']

class Identite(models.Model):
    identite_name = models.CharField(max_length=12)
    description = models.TextField(max_length=100)
    identite_entite = models.ManyToManyField(Entite,blank=True, related_name= 'entite_identite')
    user = models.ForeignKey(User, related_name='identite', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    update_at = models.DateTimeField(auto_now=True)
    class Meta:
        ordering = ['created_at']

class Caracteristique(models.Model):
    CHOICES = (('POST','POST'),('GET','GET'),('PUT','PUT'),('PATCH','PATCH'),('DELETE','DELETE'))
    action = models.CharField(choices=CHOICES , default='POST' , max_length=12)
    user = models.ForeignKey(User, related_name='caracteristique', on_delete=models.CASCADE)
    carac_identite = models.ManyToManyField(Identite , related_name='identite_carac')
    created_at = models.DateTimeField(auto_now_add=True)
    update_at = models.DateTimeField(auto_now=True)
    class Meta:
        ordering = ['created_at']


