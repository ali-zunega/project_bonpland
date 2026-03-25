import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import { getProperties, deleteProperty } from "../../services/propertyService";

const PropertyList = () => {
    const [propertyList, setPropertyList] = useState([]);
    const [toast, setToast] = useState(null);
    const [Loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {

            try {
                const data = await getProperties();
                setPropertyList(data);
                setLoading(false);
            }
            catch (error) {
                console.error("Error al cargar propiedades:", error);
                setToast("Error al cargar propiedades");
            }
            finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("¿Eliminar esta propiedad?");
        if (!confirmDelete) return;

        await deleteProperty(id);

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
            {/* TOAST */}
            {toast && (
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
            )}

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

                        <button
                            className="btn btn-danger"
                            onClick={() => handleDelete(property.id)}
                        >
                            Eliminar
                        </button>

                    </div>
                </div>
            ))}
        </div>
    );
};

export default PropertyList;