import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { propertyService } from "../../services/propertyService";
import PropertyInfo from "../../components/PropertyInfo/PropertyInfo";

const PropertyDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [property, setProperty] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      const res = await propertyService.getPropertyById(id);
      setProperty(res.data);
    };

    fetchProperty();
  }, [id]);

  const [selectedImage, setSelectedImage] = useState(null);

  const primaryImage =
    property?.images?.find((img) => img.is_primary) || property?.images?.[0];

  const currentImage = selectedImage || primaryImage;

  const handleContact = () => {
    navigate("/contact", {
      state: {
        referenceCode: property.reference_code,
        title: property.title,
        scrollToForm: true,
      },
    });
  };

  if (!property) {
    return (
      <div className="container mt-4 text-center d-flex flex-column align-items-center justify-content-center gap-3">
        <h2>Propiedad no encontrada</h2>
        <p>La propiedad que buscás no existe o fue removida.</p>
        <button
          className="btn btn-secondary mt-3"
          onClick={() => navigate("/properties")}
        >
          <i className="bi bi-arrow-left"></i> Volver a propiedades
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="row">
        {/* GALERÍA */}
        <div className="col-md-6">
          {/* Imagen principal */}
          {currentImage && (
            <img
              src={currentImage.url}
              alt={property.title}
              className="img-fluid rounded mb-3"
              style={{
                width: "100%",
                height: "400px",
                objectFit: "cover",
              }}
            />
          )}

          {/* Miniaturas */}
          {property.images?.length > 1 && (
            <div className="d-flex gap-2 flex-wrap">
              {property.images.map((img, index) => (
                <img
                  key={index}
                  src={img.url}
                  alt={`img-${index}`}
                  onClick={() => setSelectedImage(img)}
                  style={{
                    width: "80px",
                    height: "80px",
                    objectFit: "cover",
                    cursor: "pointer",
                    border:
                      currentImage?.url === img.url
                        ? "2px solid #0d6efd"
                        : "1px solid #ccc",
                    borderRadius: "5px",
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* INFO */}
        <div className="col-md-6">
          <div className="p-4 shadow-sm rounded">
            <PropertyInfo property={property} variant="details" />

            <div className="d-flex gap-2 mt-3">
              <button className="btn btn-brand" onClick={handleContact}>
                Me interesa esta propiedad
              </button>

              <button
                className="btn btn-brand-solid"
                onClick={() => navigate(-1)}
              >
                <i className="bi bi-arrow-left"></i> Volver
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
