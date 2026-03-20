import { useState } from "react";
import properties from "../../data/properties.json";
import { Link } from "react-router-dom";

const PropertyList = () => {

    const [toast, setToast] = useState(null);

    const [propertyList, setPropertyList] = useState(properties);

    const handleDelete = (id) => {
        const confirmDelete = window.confirm("¿Eliminar esta propiedad?");
        if (!confirmDelete) return;

        setPropertyList((prev) =>
            prev.filter((property) => property.id !== id)
        );

        setToast("Propiedad eliminada correctamente");

        setTimeout(() => {
            setToast(null);
        }, 2000);
    };
    return (
        <div>
            <div>

                {
                    toast && (
                        <div style={{
                            position: "fixed",
                            top: "20px",
                            right: "20px",
                            background: "#333",
                            color: "#fff",
                            padding: "10px 20px",
                            borderRadius: "5px"
                        }}>
                            {toast}
                        </div>
                    )
                }
            </div>
            <h1>Administrar propiedades</h1>


            <Link to="/admin/properties/new">
                <button className="btn btn-success">Nueva propiedad</button>
            </Link>

            {propertyList.map((property) => (
                <div key={property.id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>

                    <h3>{property.title}</h3>
                    <p>{property.city}</p>
                    <p>${property.price}</p>


                    <div style={{ display: "flex", gap: "10px" }}>

                        <Link to={`/admin/properties/${property.id}/edit`}>
                            <button className="btn btn-primary">Editar</button>
                        </Link>

                        <button className="btn btn-danger" onClick={() => handleDelete(property.id)}>
                            Eliminar
                        </button>

                    </div>
                </div>
            ))}
        </div>
    );
};

export default PropertyList;