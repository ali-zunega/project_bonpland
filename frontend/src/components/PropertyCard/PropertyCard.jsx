import React from "react";

const PropertyCard = ({ property, onClick }) => {
  const mainImage = property.images?.[0];

  const formatPrice = (price) =>
    new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
    }).format(price);

  // si esta destacada, agregar un borde amarillo a la tarjeta 
  return (

    <div
      onClick={onClick}
      className={`card mb-3 shadow-sm h-100 ${property.featured ? "border-warning" : ""}`}
      style={{ cursor: "pointer" }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}>

      <div className="position-relative">
        <img
          src={mainImage}
          className="card-img-top"
          alt={property.title}
          style={{ aspectRatio: "16/9", objectFit: "cover" }}
        />
        {/*agrega una etiqueta de "Destacada" en la esquina superior izquierda si la propiedad es destacada*/}
        {property.featured && (
          <span className="badge bg-warning text-dark position-absolute top-0 start-0 m-2">
            ⭐ Destacada
          </span>
        )}
      </div>

      <div className="card-body">
        {/* Tipo */}
        <span className="badge bg-secondary mb-2 text-uppercase">
          {property.type === "sale" ? "Venta" : "Alquiler"}
        </span>

        {/* Título */}
        <h5 className="card-title fw-semibold">{property.title}</h5>

        {/* Ubicación */}
        <p className="card-text">
          📍 {property.city}, {property.country}
        </p>

        {/* Precio */}
        <p className="card-text fw-bold fs-5 mb-2">
          💰 {formatPrice(property.price)}
        </p>

        {/* Info extra */}
        <p className="card-text text-muted small">
          🏠 {property.rooms} amb · 📐 {property.area} m²
        </p>
        <div className="d-flex justify-content-end mt-3">
          <button className="btn btn-primary">
            Ver más
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;