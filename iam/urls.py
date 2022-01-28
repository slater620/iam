from django.urls import path, include
from rest_framework.routers import DefaultRouter
from  iam import views
from django.conf import settings
from django.conf.urls.static import static

# Create a router and register our viewsets with it.
router = DefaultRouter()
router.register(r'personnes', views.PersonViewSet)
router.register(r'organisations', views.OrganizationViewSet)
router.register(r'ressource', views.ResourceViewSet)
router.register(r'identite', views.IdentiteViewSet)
router.register(r'caracteristique', views.CaracViewSet)
router.register(r'entites', views.EntiteViewSet)
router.register(r'users', views.UserViewSet)

# Les URL des API sont déterminées automatiquement par le routeur.
urlpatterns = [
    path('', include(router.urls)),
]