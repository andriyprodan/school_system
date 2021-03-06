# Generated by Django 4.0 on 2021-12-21 13:36

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('users', '0001_initial'),
        ('classes', '0001_initial'),
        ('accounting', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='studentlesson',
            name='student',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='users.student'),
        ),
        migrations.AddField(
            model_name='mark',
            name='student_lesson',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='accounting.studentlesson'),
        ),
        migrations.AddField(
            model_name='lesson',
            name='students',
            field=models.ManyToManyField(through='accounting.StudentLesson', to='users.Student'),
        ),
        migrations.AddField(
            model_name='lesson',
            name='subject',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='accounting.classsubject'),
        ),
        migrations.AddField(
            model_name='lesson',
            name='teacher',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='users.teacher'),
        ),
        migrations.AddField(
            model_name='classsubject',
            name='school_class',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='classes.schoolclass'),
        ),
        migrations.AddField(
            model_name='classsubject',
            name='subject',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='accounting.schoolsubject'),
        ),
        migrations.AddField(
            model_name='classsubject',
            name='teacher',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='users.teacher'),
        ),
    ]
