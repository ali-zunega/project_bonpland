import React from "react";
import { useNavigate, Link } from "react-router-dom";
import FeaturedProperty from "../FeaturedProperty/FeaturedProperty";
import "./FeaturedPropertiesCarousel.css";

const FeaturedPropertiesCarousel = ({ properties = [] }) => {
  const navigate = useNavigate();

  const featuredProperties = properties.filter((p) => p.featured);

  if (!featuredProperties.length) return null;

  return (
    <div
      id="featuredCarousel"
      className="carousel slide"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner">
        {featuredProperties.map((property, index) => (
          <div
            key={property.id}
            className={`carousel-item ${index === 0 ? "active" : ""}`}
          >
            <div className="container-fluid px-lg-5 py-4">
              <FeaturedProperty
                property={property}
                onClick={() => navigate(`/properties/${property.id}`)}
              />
            </div>
          </div>
        ))}
      </div>

      {featuredProperties.length > 1 && (
        <>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#featuredCarousel"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon"></span>
          </button>

          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#featuredCarousel"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon"></span>
          </button>
        </>
      )}

      <div className="text-center mt-1">
        <Link to="/properties" className="btn btn-brand">
          Explorar todo el catálogo
        </Link>
      </div>
    </div>
  );
};

export default FeaturedPropertiesCarousel;
