from rest_framework import serializers
from django.contrib.auth import get_user_model

from users.models import Student, Teacher

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        # fields = '__all__'
        exclude = ('password',)


class TeacherSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField()

    class Meta:
        model = Teacher
        fields = '__all__'

    def get_full_name(self, obj):
        return obj.user.get_full_name()


class StudentSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    full_name = serializers.SerializerMethodField()

    def get_full_name(self, obj):
        return obj.user.get_full_name()

    class Meta:
        model = Student
        fields = '__all__'
        read_only_fields = ('user.is_student',)

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user = get_user_model().objects.create(**user_data)
        password = User.objects.make_random_password(length=8)
        user.set_password(password)
        user.is_student = True
        user.save(update_fields=['password'])

        instance = self.Meta.model(**validated_data, user=user)
        instance.save()

        return instance


