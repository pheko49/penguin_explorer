from django.urls import path

from . import views

urlpatterns = [
    path("", views.penguin_list, name="penguin_list"),
    path('<int:pk>/', views.penguin_detail, name='penguin_detail')
]