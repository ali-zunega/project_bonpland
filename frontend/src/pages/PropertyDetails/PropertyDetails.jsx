import { useParams } from "react-router-dom";
import properties from "../../data/properties.json";

function PropertyDetails() {
  const { id } = useParams();

  const property = properties.find(
    (p) => p.id === Number(id)
  );

  if (!property) {
    return <h2>Propiedad no encontrada</h2>;
  }

  return (
    <div>
      <h1>{property.title}</h1>

      <img src={property.images} alt={property.title} />

      <p>{property.city}</p>
      <p>{property.rooms} ambientes</p>
      <p>${property.price}</p>
      <p>{property.description}</p>
    </div>
  );
}

export default PropertyDetails;