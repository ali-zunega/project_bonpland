import React, { useState, useEffect } from "react";
import FeaturedPropertiesCarousel from "../../components/FeaturedProperties/FeaturedPropertiesCarousel";

import { propertyService } from "../../services/propertyService";

const Home = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchFeatured = async () => {
      const res = await propertyService.getFeaturedProperties();
      setProperties(res.data);
    };

    fetchFeatured();
  }, []);

  return (
    <>
      <section className="hero bg-light d-flex align-items-center justify-content-center mt-3">
        <h1 className="text-center fw-bold">Encuentra tu hogar ideal</h1>
      </section>

      <section className="bg-light">
        <div className="container justify-content-center align-items-center d-flex flex-column">
          <h2 className="text-center mb-3">Propiedades Destacadas</h2>
          <div
            className="bg-primary mb-2"
            style={{ height: "3px", width: "80px", borderRadius: "2px" }}
          ></div>

          <FeaturedPropertiesCarousel properties={properties} />
        </div>
      </section>
    </>
  );
};

export default Home;
