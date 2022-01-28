from rest_framework import permissions

# Définition de notre classe IsUserOrReadOnly, précisement une permission 
class IsUserOrReadOnly(permissions.BasePermission):
    """
    Autorisation personnalisée permettant uniquement aux propriétaires d'un objet de le modifier.
    """

    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        if request.method in permissions.SAFE_METHODS:
            return True

        # Write permissions are only allowed to the User of the snippet.
        return obj.user == request.user
