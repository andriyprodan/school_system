from django.urls import path
from rest_framework.routers import DefaultRouter

from users import views

router = DefaultRouter()
router.register('students', views.StudentViewSet, basename='student')
router.register('teachers', views.TeacherViewSet, basename='teacher')

app_name = 'users'
urlpatterns = []

urlpatterns += router.urls
