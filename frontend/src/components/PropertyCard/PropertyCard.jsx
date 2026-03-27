import React from "react";
import PropertyInfo from "../PropertyInfo/PropertyInfo";

const PropertyCard = ({ property, onClick }) => {
  const mainImage = property.images?.[0];
  const totalImages = property.images?.length || 0;

  // si esta destacada, agregar un borde amarillo a la tarjeta 
  return (

    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
      className={`card property-card mb-3 shadow-sm h-100 ${property.featured ? "card-featured" : ""}`}
      style={{
        cursor: "pointer",
        borderRadius: "10px",
        overflow: "hidden"
      }}

      onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-5px)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
    >

      <div className="position-relative">
        <img
          src={mainImage || "/placeholder.jpg"}
          className="card-img-top"
          alt={property.title}
          style={{ aspectRatio: "16/9", objectFit: "cover" }}
        />
        {/*agrega una etiqueta de "Destacada" en la esquina superior izquierda si la propiedad es destacada*/}
        {property.featured && (
          <span
            className="position-absolute top-0 start-0 m-2 px-2 py-1 rounded shadow-sm fw-bold badge-featured text-uppercase"
          >
            <i className="bi bi-star me-1"></i> Destacada
          </span>
        )}

        {/* Si hay más de una imagen, mostrar un contador en la esquina superior derecha */}
        {totalImages > 1 && (
          <div
            className="position-absolute top-0 end-0 m-2 px-2 py-1 rounded shadow-sm badge-counter"
          >
            <i className="bi bi-images"></i> <span>{totalImages}</span>
          </div>
        )}
      </div>

      <div className="card-body d-flex flex-column">
        <PropertyInfo
          property={property}
          variant="card"
          showFeatured={false}
        />

        <div className="mt-auto d-flex justify-content-end">
          <button className="btn btn-primary" style={{ pointerEvents: 'none' }}>
            Ver más
          </button>
        </div>
      </div>

    </div>
  );
};

export default PropertyCard;