from rest_framework import serializers

from classes.models import SchoolClass

# from schedule.models import ClassSchedule
# from schedule.serializers import ScheduleSubjectSerializer
from schedule.models import PlaceInSchedule


class SchoolClassSerializer(serializers.ModelSerializer):
    students_num = serializers.ReadOnlyField()

    class Meta:
        model = SchoolClass
        fields = '__all__'
        depth = 2


# class ClassScheduleSerializer(serializers.ModelSerializer):
#     schedulesubject_set = ScheduleSubjectSerializer(many=True)
#
#     class Meta:
#         model = ClassSchedule
#         fields = "__all__"


class SchoolClassWithScheduleSerializer(serializers.ModelSerializer):
    # classschedule = ClassScheduleSerializer(read_only=True)
    grade = serializers.IntegerField(source='grade.grade')

    class Meta:
        model = SchoolClass
        fields = '__all__'






