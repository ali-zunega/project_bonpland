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
      <div className="container mt-4 text-center d-flex flex-column align-items-center justify-content-center gap-3">
        <h2>Propiedad no encontrada</h2>
        <p>La propiedad que buscás no existe o fue removida.</p>
        <button
          className="btn btn-secondary mt-3"
          onClick={() => navigate("/properties")}
        >
          <i className="bi bi-arrow-left"></i> Volver a propiedades
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
    // Simulamos el envío mostrando una alerta
    // En un caso real, aquí abriria un formulario o modal 
    // para que el usuario complete sus datos y mensaje, y luego se enviaría a través de una API
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
        <div className="col-md-6">
          <div className="property-info p-4 shadow-sm rounded">

            {/* BADGES */}
            <div className="d-flex gap-2 mb-3">
              {property.featured && (
                <span className="badge-featured px-2 py-1 rounded shadow-sm fw-bold text-uppercase">
                  <i className="bi bi-star me-1"></i> Destacada
                </span>
              )}

              <span className="badge bg-secondary text-uppercase px-3 py-2">
                {property.type === "sale" ? "Venta" : "Alquiler"}
              </span>
            </div>

            {/* TÍTULO */}
            <h2 className="fw-bold mb-2">{property.title}</h2>

            {/* UBICACIÓN */}
            <p className="text-muted mb-3">
              <i className="bi bi-geo-alt-fill property-icon"></i>
              {property.city}, {property.country}
            </p>

            {/* PRECIO */}
            <h3 className="text-brand fw-bold mb-4">
              {formatPrice(property.price)}
            </h3>

            {/* FEATURES */}
            <div className="property-features mb-4">
              <span>
                <i className="bi bi-door-open property-icon"></i>
                {property.rooms} amb
              </span>

              <span>
                <i className="bi bi-aspect-ratio property-icon"></i>
                {property.area} m²
              </span>
            </div>

            {/* DESCRIPCIÓN */}
            <p className="mb-4">{property.description}</p>

            {/* BOTONES */}
            <div className="d-flex gap-2">
              <button
                className="btn btn-brand"
                onClick={handleContact}
              >
                Me interesa esta propiedad
              </button>

              <button
                className="btn btn-brand-solid"
                onClick={() => navigate(-1)}
              >
                <i className="bi bi-arrow-left"></i> Volver
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default PropertyDetails;