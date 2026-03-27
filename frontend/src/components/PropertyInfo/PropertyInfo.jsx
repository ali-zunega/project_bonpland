const PropertyInfo = ({ property, variant = "card", showFeatured = true }) => {
    const formatPrice = (price) =>
        new Intl.NumberFormat("es-AR", {
            style: "currency",
            currency: "ARS",
        }).format(price);

    const isCard = variant === "card";
    const isDetails = variant === "details";
    const typeLabel = property.type === "sale" ? "Venta" : "Alquiler";

    return (
        <div className={isDetails ? "property-info" : ""}>

            {/* BADGES */}
            <div className={`mb-${isCard ? "2" : "3"} d-flex gap-2`}>
                {showFeatured && property.featured && (
                    <span className="badge-featured px-2 py-1 rounded shadow-sm fw-bold text-uppercase">
                        <i className="bi bi-star me-1"></i> Destacada
                    </span>

                )}
                <span
                    className={`badge badge-soft text-uppercase d-inline-flex align-items-center badge-type ${property.type}`}
                >
                    {typeLabel}
                </span>
            </div>

            {/* TÍTULO */}
            {isCard ? (
                <h5 className="fw-semibold text-dark">{property.title}</h5>
            ) : (
                <h2 className="fw-bold">{property.title}</h2>
            )}

            {/* UBICACIÓN */}
            <p className="text-muted mb-2">
                <i className="bi bi-geo-alt-fill property-icon"></i>{" "}
                {property.city}, {property.country}
            </p>

            {/* PRECIO */}
            <p className={isCard ? "fw-bold fs-5 mb-2" : "text-brand fw-bold fs-3 mb-4"}>
                {formatPrice(property.price)}
            </p>

            {/* FEATURES */}
            <div className={`property-features text-muted ${isCard ? "small" : ""}`}>
                <span className="feature-item">
                    <i className="bi bi-door-open property-icon"></i> {property.rooms} amb
                </span>

                <span className="feature-item">
                    <i className="bi bi-aspect-ratio property-icon"></i> {property.area} m²
                </span>
            </div>

            {/* SOLO DETAILS */}
            {isDetails && (
                <p className="mt-3">{property.description}</p>
            )}
        </div>
    );
};

export default PropertyInfo;