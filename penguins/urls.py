from django.urls import path

from . import views

urlpatterns = [
    path("", views.penguin_list, name="penguin_list")
]