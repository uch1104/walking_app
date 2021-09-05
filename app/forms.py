from django import forms
from django.forms.widgets import Textarea
from django.shortcuts import render
from django.core import validators

from .models import Facility
from app import models

class FacilityModelForm(forms.ModelForm):

    # memo = forms.CharField(
    #     widget=forms.Textarea(attrs={'rows': 30, 'cols': 20})
    # )

    class Meta:
        model = Facility
        fields = '__all__'
        # fields = ['name', 'title']
        # exclude = ['title']

    # def save(self, *args, **kwargs):
    #     obj = super(InformationModelForm, self).save(commit=False, *args, **kwargs)
    #     obj.name = obj.name.upper()
    #     obj.save()
    #     return obj

