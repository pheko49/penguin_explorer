from django.contrib import admin
from .models import Penguin

# Register your models here.

@admin.register(Penguin)
class PenguinAdmin(admin.ModelAdmin):
    list_display = ("id", "species", "island", "sex", "body_mass_g")
    list_filter = ("species", "island", "sex")
    search_fields = ("species", "island")