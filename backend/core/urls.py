from django.contrib import admin
from django.urls import path, include, re_path
from django.http import HttpResponse
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
    openapi.Info(
        title="Mi API",
        default_version="v1",
        description="Documentación de mi API",
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)


def home(request):
    return HttpResponse("¡Good deployment!")


urlpatterns = [
    path("admin/", admin.site.urls),
    path("", home, name="home"),
    # Rutas de las apps
    path("api/", include("properties.urls")),
    path("api/", include("contacts.urls")),
    path("api/", include("companies.urls")),
    # API Documentation
    path(
        "swagger/",
        schema_view.with_ui("swagger", cache_timeout=0),
        name="schema-swagger-ui",
    ),
    path("redoc/", schema_view.with_ui("redoc", cache_timeout=0), name="schema-redoc"),
]
