import React from "react";

const PropertyCard = ({ property }) => {
  const mainImage = property.images?.[0];

  const formatPrice = (price) =>
    new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
    }).format(price);

  return (
    <div className="card mb-3 shadow-sm h-100">
      <img
        src={mainImage}
        className="card-img-top"
        alt={property.title}
      />

      <div className="card-body">
        {/* Tipo */}
        <span className="badge bg-secondary mb-2">
          {property.type === "sale" ? "Venta" : "Alquiler"}
        </span>

        {/* Título */}
        <h5 className="card-title">{property.title}</h5>

        {/* Ubicación */}
        <p className="card-text">
          📍 {property.city}, {property.country}
        </p>

        {/* Precio */}
        <p className="card-text">
          💰 {formatPrice(property.price)}
        </p>

        {/* Info extra */}
        <p className="card-text">
          🏠 {property.rooms} amb · 📐 {property.area} m²
        </p>

        <button className="btn btn-primary">
          Ver más
        </button>
      </div>
    </div>
  );
};

export default PropertyCard;