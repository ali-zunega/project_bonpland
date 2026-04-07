import { useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import ContactForm from "../../components/ContactForm/ContactForm";

const Contact = () => {
  const location = useLocation();
  const property = location.state?.property;

  // Si viene del botón "Contactar" en PropertyDetails
  // hacemos scroll automático al formulario
  const formRef = useRef(null);

  useEffect(() => {
    if (location.state?.scrollToForm && formRef.current) {
      setTimeout(() => {
        formRef.current.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [location.state]);

  return (
    <div className="container bg-light rounded">
      <div className="row">
        {/* Info  hardcodeada -  podria venir de bachend si se implementa */}
        <div className="col-12 col-lg-5 mb-4 pe-lg-4 p-3 p-lg-4">
          <h3 className="mb-3 fw-bold">Donde encontrarnos</h3>
          <p className="mb-2">
            <strong>Dirección:</strong> Av. Siempre Viva 742, Tucumán, Argentina
          </p>
          <p className="mb-2">
            <strong>Teléfono:</strong> +54 381 123 4567
          </p>
          <p className="mb-3">
            <strong>Email:</strong> contacto@bonpland.com
          </p>

          {/* Mapa */}
          <div className="mt-3">
            <iframe
              title="map"
              src="https://www.google.com/maps?q=Tucumán+Argentina&output=embed"
              width="100%"
              height="250"
              style={{ border: 0 }}
              loading="lazy"
            ></iframe>
          </div>
        </div>

        {/* Formulario */}
        <div
          className="col-12 col-lg-7"
          style={{ scrollMarginTop: "80px" }}
          ref={formRef}
        >
          <ContactForm property={property} />
        </div>
      </div>
    </div>
  );
};

export default Contact;
