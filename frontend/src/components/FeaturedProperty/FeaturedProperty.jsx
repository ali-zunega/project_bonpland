import React from "react";
import "./FeaturedProperty.css";

const getMainImage = (images = []) => {
  if (!images.length) return "/placeholder.jpg";

  const primary = images.find((img) => img.isPrimary);
  if (primary) return primary.url;

  return typeof images[0] === "string" ? images[0] : images[0].url;
};

const FeaturedProperty = ({ property, onClick }) => {
  const isSale = property.operation_type === "sale";
  const propertyType = isSale ? "VENTA" : "ALQUILER";
  const imageUrl = getMainImage(property.images);

  return (
    <div className="featured-property" onClick={onClick}>
      {/* Imagen */}
      <div className="featured-image-container">
        <img src={imageUrl} alt={property.title} className="featured-image" />
      </div>

      {/* Contenido */}
      <div className="featured-content">
        <div className="featured-body">
          <h3 className="featured-title fw-bold">{property.title}</h3>

          <p className="featured-location">
            {property.cityName}, {property.countryName}
          </p>

          <span
            className={`badge badge-soft badge-type ${isSale ? "sale" : "rent"}`}
          >
            {propertyType}
          </span>

          <p className="featured-price">$ {property.price}</p>
        </div>

        <div className="featured-footer">
          <button className="btn btn-brand">Ver propiedad</button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProperty;
