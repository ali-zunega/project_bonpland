import React from "react";

const PropertyCard = ({ property, onClick }) => {
  const mainImage = property.images?.[0];
  const totalImages = property.images?.length || 0;

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
      style={{
        cursor: "pointer",
        transition: "all 0.3s ease",
        border: property.featured ? "2px solid #eab975" : "1px solid rgba(0,0,0,0.125)",
        borderRadius: "10px",
        overflow: "hidden"
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-5px)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}>

      <div className="position-relative">
        <img
          src={mainImage}
          className="card-img-top"
          alt={property.title}
          style={{ aspectRatio: "16/9", objectFit: "cover" }}
        />
        {/*agrega una etiqueta de "Destacada" en la esquina superior izquierda si la propiedad es destacada*/}
        {property.featured && (
          <span
            className="position-absolute top-0 start-0 m-2 px-2 py-1 rounded shadow-sm fw-bold"
            style={{ backgroundColor: "#eab975", color: "black", fontSize: "0.75rem" }}
          >
            ⭐ DESTACADA
          </span>
        )}

        {/* Si hay más de una imagen, mostrar un contador en la esquina superior derecha */}
        {totalImages > 1 && (
          <div
            className="position-absolute top-0 end-0 m-2 px-2 py-1 rounded shadow-sm"
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.4)",
              color: "white",
              fontSize: "0.85rem",
              backdropFilter: "blur(4px)"
            }}
          >
            📷 {totalImages}
          </div>
        )}
      </div>

      <div className="card-body d-flex flex-column">
        <div className="mb-2">
          <span className="badge bg-dark text-uppercase" style={{ fontSize: '0.7rem' }}>
            {property.type === "sale" ? "Venta" : "Alquiler"}
          </span>
        </div>

        <h5 className="card-title fw-semibold" style={{ color: "#000" }}>{property.title}</h5>

        <p className="card-text text-muted mb-1">
          📍 {property.city}, {property.country}
        </p>

        <p className="card-text fw-bold fs-5 mb-2" style={{ color: "#333" }}>
          {formatPrice(property.price)}
        </p>

        <p className="card-text text-muted small">
          🏠 {property.rooms} amb · 📐 {property.area} m²
        </p>

        {/* El botón ahora es puramente visual ya que toda la card tiene el onClick */}
        <div className="mt-auto d-flex justify-content-end">
          <button className="btn-custom" style={{ pointerEvents: 'none' }}>
            Ver más
          </button>
        </div>
      </div>

    </div>
  );
};

export default PropertyCard;