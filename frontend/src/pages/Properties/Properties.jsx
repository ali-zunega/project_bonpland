import properties from "../../data/properties.json";
import { useNavigate } from "react-router-dom";
import PropertyCard from "../../components/PropertyCard/PropertyCard";

const Properties = () => {
  const navigate = useNavigate();

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Propiedades disponibles</h1>

      <div className="row">
        {properties.map((property) => (
          <div key={property.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
            <PropertyCard
              property={property}
              onClick={() => navigate(`/properties/${property.id}`)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Properties;