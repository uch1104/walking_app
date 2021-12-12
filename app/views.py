from app.models import Facility
from django.shortcuts import redirect, render
from django.http import HttpResponse, response
from django.views.generic import View
from django.http import HttpResponse, JsonResponse, QueryDict
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from distutils.util import strtobool
import json

from . import forms
import app


def index(request):
    # form = forms.FacilityModelForm()
    # if request.method == 'POST':
    #     form = forms.FacilityModelForm(request.POST)
    #     if form.is_valid():
    #         print(form.cleaned_data)
    #         form.save()
    facilities = Facility.objects.all()

    return render(
        request, 'app/index.html', context={
        'facilities': facilities
        }
    )


def manage(request):
    form = forms.FacilityModelForm()
    if request.method == 'POST':
        form = forms.FacilityModelForm(request.POST)
        if form.is_valid():
            print(form.cleaned_data)
            form.save()
            return redirect('app:index')
    return render(
        request, 'app/manage.html', context={
        'form': form
        }
    )

@method_decorator(csrf_exempt, name='dispatch')
class FacilityView(View):
    def post(self, request):
        print(request)
        # request_data = json.loads(request.body)
        # print(request_data)
        print(request.POST)

        

        params = {
            'name': request.POST['name'],
            'address': request.POST['address'],
            'time': int(request.POST['time']),
            'type': request.POST['type'],
            'bad_weather': strtobool(request.POST['bad_weather']),
            'stroller': strtobool(request.POST['stroller']),
            'nursing_room': strtobool(request.POST['nursing_room']),
            'diaper_stand': strtobool(request.POST['diaper_stand']),
            'comment': request.POST['comment'],
        }

        app.models.Facility.objects.create(**params)

        print(params)

        return JsonResponse(params)

@csrf_exempt
def search_facility(request):
    print(request.POST)
    print(request.POST['type'])
    searched_facility = Facility.objects.filter(
        name__icontains=request.POST['name'], 
        # type=request.POST['type'],
        # time=int(request.POST['time']),
        bad_weather=strtobool(request.POST['bad_weather']),
        stroller=strtobool(request.POST['stroller']),
        nursing_room=strtobool(request.POST['nursing_room']),
        diaper_stand=strtobool(request.POST['diaper_stand']),
        comment__icontains=request.POST['comment'],
        )

    if request.POST['time'] != '':
        searched_facility.filter(time=int(request.POST['time']))
    if request.POST['type'] != '':
        searched_facility.filter(type=request.POST['type'])


    facilities = []

    for facility in searched_facility.values():
        facilities.append(facility)

    response = {
        'items': facilities,
        'total': len(facilities)
    }

    print(response)

    return JsonResponse(response)