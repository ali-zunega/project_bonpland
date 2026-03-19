import properties from "../../data/properties.json";
import { useNavigate } from "react-router-dom";

const Properties = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Propiedades disponibles</h1>

      {properties.map((property) => (
        <div
          key={property.id}
          onClick={() => navigate(`/properties/${property.id}`)}
          style={{ cursor: "pointer" }}
        >
          <img src={property.images} alt={property.title} />

          <h3>{property.title}</h3>
          <p>{property.city}</p>
          <p>{property.rooms} ambientes</p>
          <p>${property.price}</p>
        </div>
      ))}
    </div>
  );
};

export default Properties;