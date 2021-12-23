from django.urls import path
from rest_framework.routers import DefaultRouter

from accounting import views

router = DefaultRouter()

router.register(r'lessons', views.LessonViewSet, basename='lesson')
router.register(r'class_subjects', views.ClassSubjectViewSet, basename='class_subject')
router.register(r'marks', views.MarkViewSet, basename='mark')

urlpatterns = [
    path('student_lesson/<int:pk>/', views.StudentLessonUpdateAPIView.as_view())
]

urlpatterns += router.urls