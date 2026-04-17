from django.db import models


class Contact(models.Model):

    class Source(models.TextChoices):
        PROPERTY = "property", "Property"
        GENERAL = "general", "General"

    name = models.CharField(max_length=100)

    email = models.EmailField()

    phone = models.CharField(max_length=20, null=True, blank=True)

    contact_reason = models.CharField(max_length=100, null=True, blank=True)

    message = models.TextField()

    source = models.CharField(max_length=10, choices=Source.choices)

    property = models.ForeignKey(
        "properties.Property",  # ajustá si tu app/modelo se llama distinto
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="contacts",
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.email}"
