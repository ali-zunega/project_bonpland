import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import properties from "../../data/properties.json";

const PropertyDetails = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const property = properties.find(
    (p) => p.id === parseInt(id)
  );

  const [selectedImage, setSelectedImage] = useState(
    property?.images?.[0]
  );

  // Si no se encuentra la propiedad, mostrar mensaje de error
  if (!property) {
    return (
      <div className="container mt-4 center">
        <h2>Propiedad no encontrada</h2>
        <p>La propiedad que buscás no existe o fue removida.</p>
        <button
          className="btn btn-secondary mt-3"
          onClick={() => navigate("/properties")}
        >
          Volver a propiedades
        </button>
      </div>
    );
  }

  // formateo de precio
  const formatPrice = (price) =>
    new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
    }).format(price);

  // handler de contacto (simulado)
  const handleContact = () => {
    const message = {
      propertyId: property.id,
      title: property.title,
    };

    console.log("Mensaje a enviar:", message);

    alert(`Consulta enviada por la propiedad ID ${property.id}`);
  };

  return (
    <div className="container mt-4">
      <div className="row">

        {/* GALERÍA */}
        <div className="col-md-6">
          {/* Imagen principal */}
          <img
            src={selectedImage}
            alt={property.title}
            className="img-fluid rounded mb-3"
            style={{
              width: "100%",
              height: "400px",
              objectFit: "cover",
            }}
          />

          {/* Miniaturas */}
          <div className="d-flex gap-2 flex-wrap">
            {property.images?.length > 1 && (
              <div className="d-flex gap-2 flex-wrap">
                {property.images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`img-${index}`}
                    onClick={() => setSelectedImage(img)}
                    style={{
                      width: "80px",
                      height: "80px",
                      objectFit: "cover",
                      cursor: "pointer",
                      border:
                        selectedImage === img
                          ? "2px solid #0d6efd"
                          : "1px solid #ccc",
                      borderRadius: "5px",
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* INFO */}
        <div className="col-md-6">
          <div className="d-flex gap-2 mb-2 mt-3">
            {property.featured && (
              <span className="badge bg-warning text-dark px-3 py-2">
                ⭐ Destacada
              </span>
            )}

            <span className="badge bg-secondary text-uppercase px-3 py-2">
              {property.type === "sale" ? "Venta" : "Alquiler"}
            </span>
          </div>

          {/* Título */}
          <h2 className="fw-bold">{property.title}</h2>

          {/* Ubicación */}
          <p className="text-muted">
            📍 {property.city}, {property.country}
          </p>

          {/* Precio */}
          <h3 className="text-primary fw-bold">
            {formatPrice(property.price)}
          </h3>

          {/* Info */}
          <p>
            🏠 {property.rooms} ambientes · 📐 {property.area} m²
          </p>

          {/* Descripción */}
          <p>{property.description}</p>

          {/* Botones */}
          <div className="d-flex gap-2 mt-4">
            <button
              className="btn-custom mt-3 mb-3"
              onClick={handleContact}
            >
              Me interesa esta propiedad
            </button>
            <button
              className="btn-brand-solid mt-3 mb-3"
              onClick={() => navigate(-1)}
            >
              ← Volver
            </button>
          </div>
        </div>


      </div>
    </div>
  );
};

export default PropertyDetails;