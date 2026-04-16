from django.db import models
from django.contrib.auth.models import AbstractUser


class Company(models.Model):

    name = models.CharField(max_length=150)

    phone = models.CharField(max_length=20, null=True, blank=True)

    email = models.EmailField(unique=True)

    address = models.CharField(max_length=255, null=True, blank=True)

    about_us = models.TextField(null=True, blank=True)

    history = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.name


class User(AbstractUser):

    # Remove the username field and use email as the unique identifier
    username = None

    email = models.EmailField(unique=True)

    company = models.ForeignKey(
        "companies.Company", on_delete=models.CASCADE, related_name="users"
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["first_name", "last_name"]

    def __str__(self):
        return self.email
