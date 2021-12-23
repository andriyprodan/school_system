from rest_framework import serializers

# from schedule.models import ScheduleSubject, SchoolSubject
from accounting.serializers import ClassSubjectSerializer
from schedule.models import ClassSchedule, PlaceInSchedule
from users.models import Teacher



class PlaceInScheduleSerializer(serializers.ModelSerializer):
    # subject = ClassSubjectSerializer()
    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['subject'] = ClassSubjectSerializer(instance.subject).data
        return data

    class Meta:
        model = PlaceInSchedule
        fields = '__all__'


class ClassScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClassSchedule
        fields = '__all__'
        depth = 3
