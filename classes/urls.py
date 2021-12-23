from django.urls import path
from rest_framework.routers import DefaultRouter

from classes import views

router = DefaultRouter()


urlpatterns = [
    path('', views.SchoolClassListCreateAPIView.as_view(), name='classes_list'),
    path('<int:class_id>/schedule_subjects/', views.ClassScheduleSubjectsAPIView.as_view(), name='schedule_subjects-list'),
    path('<int:class_id>/subjects/', views.SchoolClassSubjectsListAPIView.as_view(), name='class_subjects_list'),
    path('<int:class_id>/students/', views.SchoolClassStudentsListAPIView.as_view(), name='class_students_list'),
    path('<int:class_id>/statistics/', views.ClassStudentsStatisticsAPIView.as_view(), name='class_statistic_list'),
]

urlpatterns += router.urls