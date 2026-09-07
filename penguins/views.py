from django.core.paginator import Paginator
from django.shortcuts import render
from .models import Penguin
from django.db.models import Q, Avg, Count, Min, Max

# Create your views here.

def penguin_list(request):

    # penguins = Penguin.objects.all()

    # penguins = Penguin.objects.filter(
    #     island='Biscoe',
    #     species='Gentoo')

    species = request.GET.get('species')

    island = request.GET.get('island')

    page_number = request.GET.get('page')

    search = request.GET.get('search')

# OLD BLOCK BELOW -- commented out
    # if species and island:
    #     penguins = Penguin.objects.filter(
    #         species=species,
    #         island=island
    #         )
    # elif species:
    #     penguins = Penguin.objects.filter(species=species)
    # elif island:
    #     penguins = Penguin.objects.filter(island=island)
    # else:
    #     penguins = Penguin.objects.all()

    # NEW BLOCK BELOW
    penguins = Penguin.objects.all()

    if species:
        penguins = penguins.filter(species=species)

    if island:
        penguins = penguins.filter(island=island)

    if search:
        penguins = penguins.filter(
            Q(species__icontains=search) |
            Q(island__icontains=search)
        )

    total_penguins = penguins.count()

    average_body_mass = penguins.aggregate(
        Avg('body_mass_g')
    )['body_mass_g__avg']

    average_flipper_length = penguins.aggregate(
        Avg('flipper_length_mm')
    )['flipper_length_mm__avg']

    average_bill_length = penguins.aggregate(
        Avg('bill_length_mm')
    )['bill_length_mm__avg']

    minimum_body_mass = penguins.aggregate(
        Min('body_mass_g')
    )['body_mass_g__min']

    maximum_body_mass = penguins.aggregate(
        Max('body_mass_g')
    )['body_mass_g__max']

    species_counts = penguins.values('species').annotate(
        count=Count('id'),
        average_body_mass=Avg('body_mass_g')
    )

    paginator = Paginator(penguins, 20)

    page_obj = paginator.get_page(page_number)

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
                    #   'penguins': penguins,
                    'penguins': page_obj,
                      'species_options': species_options,
                      'selected_species': species,
                      'island_options': island_options,
                      'selected_island': island,
                      'search': search,
                      'total_penguins': total_penguins,
                      'average_body_mass': average_body_mass,
                      'average_flipper_length': average_flipper_length,
                      'average_bill_length': average_bill_length,
                      'species_counts': species_counts,
                      'minimum_body_mass': minimum_body_mass,
                      'maximum_body_mass': maximum_body_mass
                  })

def penguin_detail(request, pk):

    penguin = Penguin.objects.get(id=pk)

    return render(request, 'penguins/penguin_detail.html', {
        'penguin': penguin
    })