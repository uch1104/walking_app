from django.conf.urls import url
from django.urls import path
from . import views

app_name = 'app'

urlpatterns = [
    path('', views.index, name='index'),
    path('manage/', views.manage, name='manage'),
    path('api/facilities/', views.FacilityView.as_view()),
    path('api/search/', views.search_facility),
]