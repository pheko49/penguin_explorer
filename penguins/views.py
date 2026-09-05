from django.shortcuts import render

from .models import Penguin
# Create your views here.

def penguin_list(request):

    penguins = Penguin.objects.all()

    return render(request,'penguins/penguin_list.html',
                  {
                      'penguins': penguins
                  })