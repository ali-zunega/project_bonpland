import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import PropertyCard from "../PropertyCard/PropertyCard";
import "./FeaturedPropertiesCarousel.css";


const FeaturedPropertiesCarousel = ({ properties }) => {
    const navigate = useNavigate();
    const [itemsPerSlide, setItemsPerSlide] = useState(3);
    const featuredProperties = properties.filter(p => p.featured);

    // Ajustar cantidad de items según el ancho de ventana
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setItemsPerSlide(1); // Móvil
            } else if (window.innerWidth < 1200) {
                setItemsPerSlide(2); // Tablet / Laptop pequeña
            } else {
                setItemsPerSlide(3); // Desktop
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const chunkArray = (array, size) => {
        const result = [];
        for (let i = 0; i < array.length; i += size) {
            result.push(array.slice(i, i + size));
        }
        return result;
    };

    const slides = chunkArray(featuredProperties, itemsPerSlide);

    return (
        <div id="featuredCarousel" className="carousel slide" data-bs-ride="carousel">

            <div className="carousel-inner">
                {slides.map((group, index) => (
                    <div key={index} className={`carousel-item ${index === 0 ? "active" : ""}`}>
                        <div className="container">
                            <div className="row justify-content-center">
                                {group.map(property => (
                                    <div key={property.id} className={`col-${12 / itemsPerSlide} p-2`}>
                                        <PropertyCard
                                            property={property}
                                            onClick={() => navigate(`/properties/${property.id}`)} 
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>


            {/* Solo muestra controles si hay más de un slide */}
            {slides.length > 1 && (
                <>
                    <button className="carousel-control-prev" type="button" data-bs-target="#featuredCarousel" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" style={{ filter: 'invert(1)' }}></span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#featuredCarousel" data-bs-slide="next">
                        <span className="carousel-control-next-icon" style={{ filter: 'invert(1)' }}></span>
                    </button>
                </>
            )}

            {/* boton al listado completo de propiedades*/}
            <div className="text-center mt-4">
                <Link to="/properties" className="btn btn-brand">
                    Explorar todo el catálogo
                </Link>
            </div>

        </div>



    );
};

export default FeaturedPropertiesCarousel;