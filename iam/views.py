from django.shortcuts import render
from rest_framework import permissions , viewsets
from rest_framework.response import Response
from .models import *
from .permissions import *
from .serializers import *


# Create your views here.
class PersonViewSet(viewsets.ModelViewSet):
    """
    Ce viewset fournit automatiquement les actions list, create, retrieve,
    update et destroy pour les personnes
    """
    queryset = Person.objects.all()
    serializer_class = PersonSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsUserOrReadOnly,]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class OrganizationViewSet(viewsets.ModelViewSet):
    """
    Ce viewset fournit automatiquement les actions list, create, retrieve,
    update et destroy pour les organisations
    """
    queryset = Organization.objects.all()
    serializer_class = OrganizationSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsUserOrReadOnly,]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class ResourceViewSet(viewsets.ModelViewSet):
    """
    Ce viewset fournit automatiquement les actions list, create, retrieve,
    update et destroy pour les ressources
    """
    queryset = Resource.objects.all()
    serializer_class = ResourceSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsUserOrReadOnly,]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class IdentiteViewSet(viewsets.ModelViewSet):
    """
    Ce viewset fournit automatiquement les actions list, create, retrieve,
    update et destroy pour les Identite
    """
    queryset = Identite.objects.all()
    serializer_class = IdentiteSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsUserOrReadOnly,]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class CaracViewSet(viewsets.ModelViewSet):
    """
    Ce viewset fournit automatiquement les actions list, create, retrieve,
    update et destroy pour les caracterisques
    """
    queryset = Caracteristique.objects.all()
    serializer_class = CaracteristiqueSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsUserOrReadOnly,]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
    

class UserViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Ce viewset fournit automatiquement les actions list, et detail pour les users.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer


class EntiteViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Ce viewset fournit automatiquement les actions list, et detail pour les users.
    """
    queryset = Entite.objects.all()
    serializer_class = EntiteSerializer