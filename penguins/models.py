from django.db import models

# Create your models here.
class Penguin(models.Model):
    species = models.CharField(max_length=50)
    island = models.CharField(max_length=50)
    bill_length_mm = models.FloatField()
    bill_depth_mm = models.FloatField()
    flipper_length_mm = models.PositiveIntegerField()
    body_mass_g = models.PositiveIntegerField()
    sex = models.CharField(max_length=10, blank=True)

    def __str__(self):
        return f'{self.species} - {self.island}'