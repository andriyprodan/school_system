from functools import reduce
import operator

from rest_framework import permissions


class ActionBasedPermission(permissions.AllowAny):
    """
    Grant or deny access to a view, based on a mapping in view.action_permissions
    """

    def has_permission(self, request, view):
        for perm_klasses, actions in getattr(view, 'action_permissions', {}).items():
            if view.action in actions:
                return reduce(operator.or_, (klas().has_permission(request, view) for klas in perm_klasses))
        return False