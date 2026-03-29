import { useLocation } from "react-router-dom";
import ContactForm from "../../components/ContactForm/ContactForm";

const Contact = () => {
  const location = useLocation();
  const property = location.state?.property;

  return (
    <div className="container bg-light rounded">
      <div className="row">
        {/* Info */}
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
        <div className="col-12 col-lg-7">
          <ContactForm property={property} />
        </div>
      </div>
    </div>
  );
};

export default Contact;
