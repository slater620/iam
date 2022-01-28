from rest_framework import serializers
from .models import *


class PersonSerializer(serializers.HyperlinkedModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')
    class Meta:
        model = Person
        fields = ['url', 'id','created_at','update_at', 'user', 'person_name', 'surname','email','password' ]

class OrganizationSerializer(serializers.HyperlinkedModelSerializer):
    user = serializers.ReadOnlyField(source='utilisateur.username')
    class Meta:
        model = Organization
        fields = ['url', 'id', 'user','created_at','update_at', 'org_name', 'description']


class ResourceSerializer(serializers.HyperlinkedModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')
    class Meta:
        model = Resource
        fields = ['url', 'id', 'user','created_at','update_at', 'title','description','year','author']

class CaracteristiqueSerializer(serializers.HyperlinkedModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')
    carac_identite = serializers.HyperlinkedRelatedField(many=True, view_name='caracteristique-detail', read_only=True)
    class Meta:
        model = Caracteristique
        fields = ['url', 'id','created_at','update_at', 'user','action']

class IdentiteSerializer(serializers.HyperlinkedModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')
    identite_entite = serializers.HyperlinkedRelatedField(many=True, view_name='identite-detail', read_only=True)
    class Meta:
        model = Identite
        fields = ['url', 'id','created_at','update_at', 'user', 'identite_name','identite_entite','description']
class UserSerializer(serializers.HyperlinkedModelSerializer):
   
    class Meta:
        model = User
        fields = ['url', 'id','username', 'email']

class EntiteSerializer(serializers.HyperlinkedModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')
    reflex = serializers.HyperlinkedRelatedField(many=True, view_name='entite-detail', read_only=True)
    class Meta:
        model = Entite
        fields = ['url', 'id', 'user','reflex'] 