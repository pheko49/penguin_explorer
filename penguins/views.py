from django.shortcuts import render

from .models import Penguin
# Create your views here.

def penguin_list(request):

    # penguins = Penguin.objects.all()

    # penguins = Penguin.objects.filter(
    #     island='Biscoe',
    #     species='Gentoo')

    species = request.GET.get('species')

    island = request.GET.get('island')

    if species and island:
        penguins = Penguin.objects.filter(
            species=species,
            island=island
            )
    elif species:
        penguins = Penguin.objects.filter(species=species)
    elif island:
        penguins = Penguin.objects.filter(island=island)
    else:
        penguins = Penguin.objects.all()

    species_options = Penguin.objects.values_list(
        'species',
        flat=True
    ).distinct()

    island_options = Penguin.objects.values_list(
        'island',
        flat=True
    ).distinct()

    return render(request,'penguins/penguin_list.html',
                  {
                      'penguins': penguins,
                      'species_options': species_options,
                      'selected_species': species,
                      'island_options': island_options,
                      'selected_island': island
                  })