from django.shortcuts import render

from .models import Penguin
# Create your views here.

def penguin_list(request):

    # penguins = Penguin.objects.all()

    # penguins = Penguin.objects.filter(
    #     island='Biscoe',
    #     species='Gentoo')

    species = request.GET.get('species')

    if species:
        penguins = Penguin.objects.filter(species=species)
    else:
        penguins = Penguin.objects.all()

    species_options = Penguin.objects.values_list(
        'species',
        flat=True
    ).distinct()

    return render(request,'penguins/penguin_list.html',
                  {
                      'penguins': penguins,
                      'species_options': species_options,
                      'selected_species': species
                  })