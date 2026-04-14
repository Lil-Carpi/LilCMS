from django.db import models

class Usuario(models.Model):
    nombre = models.CharField(max_length=50)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)

    class Meta:
        db_table = 'usuarios'
        managed = False