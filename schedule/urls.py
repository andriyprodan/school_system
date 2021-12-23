from rest_framework.routers import DefaultRouter

from schedule import views

router = DefaultRouter()
# router.register(r'schedules', views.ScheduleViewSet, basename='class_schedule')
router.register(r'places_in_schedule', views.PlaceInScheduleViewSet, basename='place_in_schedule')

urlpatterns = router.urls