import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export function AboutMe() {
  return (
    <section className="container my-3">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="card shadow-sm border-0 p-2">
            <h2 className="mb-3 text-center fw-bold">Quiénes Somos</h2>
            <p className="lead text-center">
              En Inmobiliaria Bonpland conectamos personas con oportunidades
              únicas en el mercado inmobiliario de Latinoamérica.
            </p>
            <hr />
            <p>
              Nuestro objetivo es simplificar la búsqueda de propiedades,
              ofreciendo una plataforma clara, intuitiva y completa donde cada
              usuario pueda encontrar el inmueble que mejor se adapte a sus
              necesidades.
            </p>
            <p>
              Creemos que cada propiedad tiene una historia y cada cliente un
              proyecto. Por eso, brindamos información detallada, herramientas
              de búsqueda avanzadas y un acompañamiento cercano durante todo el
              proceso.
            </p>
            <p className="mb-0">
              Nuestro compromiso es ofrecer transparencia, confianza y
              eficiencia, facilitando la toma de decisiones a través de una
              experiencia digital moderna.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
