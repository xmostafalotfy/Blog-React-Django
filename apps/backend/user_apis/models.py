from django.db import models
from django.contrib.auth.models import AbstractUser
import os
import uuid

def unique_image_name(instance, filename):
    extension = filename.split('.')[-1]
    unique_filename = f"{uuid.uuid4().hex}.{extension}"
    return os.path.join(f'{instance.__class__.__name__.lower()}', unique_filename)


class User(AbstractUser):
    img = models.ImageField(upload_to=unique_image_name, default='user/default.png')
    email = models.EmailField(unique=True, blank=False, null=False)
    is_activated = models.BooleanField(default=False)
    def __str__(self):
        return f"{self.first_name} {self.last_name}"

