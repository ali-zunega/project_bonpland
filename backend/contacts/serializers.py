from rest_framework import serializers
from .models import Contact


class ContactSerializer(serializers.ModelSerializer):

    class Meta:
        model = Contact
        fields = "__all__"

    def validate(self, data):
        source = data.get("source")
        property_obj = data.get("property")

        if source == "property" and not property_obj:
            raise serializers.ValidationError(
                "Property es requerida cuando el source es 'property'"
            )

        return data
