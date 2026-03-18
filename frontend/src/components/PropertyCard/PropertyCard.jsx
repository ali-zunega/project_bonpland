import "../PropertyCard/PropertyCard.css";

const PropertyCard = ({ property }) => {
  const {
    title,
    city,
    price,
    rooms,
    images,
    type,
    status
    } = property;

    return (
    <div className="property-card">
        <div className="property-image">
        <img src={images?.[0]} alt={title} />

        <span className={`badge ${type}`}>
            {type === "sale" ? "Venta" : "Alquiler"}
        </span>

        {status !== "available" && (
            <span className="status">No disponible</span>
        )}
        </div>

        <div className="property-info">
        <h3>{title}</h3>
        <p className="location">{city}</p>

        <div className="details">
          <span>🛏 {rooms} ambientes</span>
        </div>

        <p className="price">
          ${price.toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default PropertyCard;