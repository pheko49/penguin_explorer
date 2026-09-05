import csv

from django.conf import settings
from django.core.management.base import BaseCommand

from penguins.models import Penguin

class Command(BaseCommand):
    def handle(self, *args, **options):
        csv_path = settings.BASE_DIR / "data" / "processed" / "penguins_clean.csv"

        with csv_path.open(encoding="utf-8", newline="") as file:
            reader = csv.DictReader(file)

            for row in reader:
                Penguin.objects.create(
                    species=row['species'],
                    island=row['island'],
                    bill_length_mm=float(row['bill_length_mm']),
                    bill_depth_mm=float(row['bill_depth_mm']),
                    flipper_length_mm=int(float(row['flipper_length_mm'])),
                    body_mass_g=int(float(row['body_mass_g'])),
                    sex=row['sex'] or ''
                )

            self.stdout.write('Penguin data imported successfully.')