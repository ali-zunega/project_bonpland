from rest_framework import serializers
from .models import Property, PropertyImage
from core.models import City
from companies.models import Company


class PropertyImageSerializer(serializers.ModelSerializer):

    class Meta:
        model = PropertyImage
        fields = ["id", "url", "is_primary", "created_at"]


class PropertySerializer(serializers.ModelSerializer):

    images = PropertyImageSerializer(many=True, read_only=True)

    city = serializers.PrimaryKeyRelatedField(queryset=City.objects.all())

    company = serializers.PrimaryKeyRelatedField(queryset=Company.objects.all())

    class Meta:
        model = Property
        fields = "__all__"
