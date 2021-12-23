from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets

from schedule.models import PlaceInSchedule, ClassSchedule
from schedule.serializers import ClassScheduleSerializer, PlaceInScheduleSerializer


class PlaceInScheduleViewSet(viewsets.ModelViewSet):
    queryset = PlaceInSchedule.objects.all()
    serializer_class = PlaceInScheduleSerializer

