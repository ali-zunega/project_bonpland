import React from 'react';
import FeaturedPropertiesCarousel from '../../components/FeaturedProperties/FeaturedPropertiesCarousel';

import properties from '../../data/properties.json'; 

const Home = () => {
  return (
    <main>
      <section className="hero">
        <h1>Encuentra tu hogar ideal</h1>
      </section>

      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-4">Propiedades Destacadas</h2>
          
          {/* Aquí insertas el componente */}
          <FeaturedPropertiesCarousel properties={properties} />
          
        </div>
      </section>

      {/* Luego agregar boton de "Ver todas las propiedades" */}
    </main>
  );
};

export default Home;