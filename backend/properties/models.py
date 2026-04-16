from django.db import models


class Property(models.Model):

    class OperationType(models.TextChoices):
        RENT = "rent", "Rent"
        SALE = "sale", "Sale"

    class Status(models.TextChoices):
        AVAILABLE = "available", "Available"
        RESERVED = "reserved", "Reserved"
        RENTED = "rented", "Rented"
        SOLD = "sold", "Sold"

    class PropertyType(models.TextChoices):
        APARTMENT = "apartment", "Apartment"
        HOUSE = "house", "House"
        LAND = "land", "Land"
        COMMERCIAL = "commercial", "Commercial"

    title = models.CharField(max_length=150)

    description = models.TextField()

    rooms = models.IntegerField()

    square_meters = models.DecimalField(max_digits=10, decimal_places=2)

    price = models.DecimalField(max_digits=12, decimal_places=2)

    operation_type = models.CharField(max_length=10, choices=OperationType.choices)

    status = models.CharField(max_length=10, choices=Status.choices)

    type = models.CharField(max_length=15, choices=PropertyType.choices)

    address = models.CharField(max_length=255)

    featured = models.BooleanField(default=False)

    published = models.BooleanField(default=True)

    reference_code = models.CharField(max_length=50, unique=True)

    city = models.ForeignKey(
        "core.City",  # ajustá si tu modelo está en otra app
        on_delete=models.CASCADE,
        related_name="properties",
    )

    company = models.ForeignKey(
        "company.Company", on_delete=models.CASCADE, related_name="properties"
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.title} - {self.reference_code}"


class PropertyImage(models.Model):

    url = models.URLField(max_length=500)

    is_primary = models.BooleanField(default=False)

    property = models.ForeignKey(
        "properties.Property", on_delete=models.CASCADE, related_name="images"
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Image for {self.property_id}"
