from django.db import models

# Create your models here.
class Facility(models.Model):
    name = models.CharField(null=True, unique=True, max_length=255, help_text='名前')
    address = models.TextField(null=True, help_text='住所')
    latitude = models.FloatField(null=True, help_text='緯度')
    longitude = models.FloatField(null=True, help_text='経度')
    time = models.IntegerField(null=True, help_text='所要時間')
    type = models.TextField(null=True, help_text='種類')
    bad_weather = models.BooleanField(default=False, help_text='悪天候')
    stroller = models.BooleanField(default=False, help_text='ベビーカー')
    nursing_room = models.BooleanField(default=False, help_text='授乳室')
    diaper_stand = models.BooleanField(default=False, help_text='おむつ交換台')
    comment = models.TextField(null=True, help_text='コメント')
