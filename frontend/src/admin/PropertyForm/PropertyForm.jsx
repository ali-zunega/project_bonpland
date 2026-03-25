import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
    getPropertyById,
    createProperty,
    updateProperty,
} from "../../services/propertyService";

const PropertyForm = () => {
    const { id } = useParams();
    const isEdit = Boolean(id);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        country: "",
        city: "",
        price: "",
        area: "",
        rooms: "",
        status: "",
        type: "sale",
        featured: false,
    });

    const [loading, setLoading] = useState(false);
    const [loadingData, setLoadingData] = useState(isEdit);
    const [error, setError] = useState(null);

    // 🔥 Cargar propiedad en modo edición
    useEffect(() => {
        const fetchProperty = async () => {
            if (!isEdit) return;

            try {
                const data = await getPropertyById(id);
                setFormData(data);
            } catch (err) {
                setError("Error al cargar la propiedad");
                console.error(err);
            } finally {
                setLoadingData(false);
            }
        };

        fetchProperty();
    }, [id, isEdit]);

    // 🧠 Manejo de inputs
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]:
                type === "checkbox"
                    ? checked
                    : type === "number"
                        ? Number(value)
                        : value,
        }));
    };

    // 🚀 Submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (isEdit) {
                await updateProperty(id, formData);
            } else {
                await createProperty(formData);
            }

            navigate("/admin/properties", { replace: true });
        } catch (err) {
            setError("Error al guardar la propiedad");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // ⏳ Loading inicial (edit)
    if (loadingData) {
        return (
            <div className="text-center mt-4">
                <div className="spinner-border" />
                <p className="mt-2">Cargando propiedad...</p>
            </div>
        );
    }

    // ❌ Error UI
    if (error) {
        return <p className="text-danger text-center mt-4">{error}</p>;
    }

    return (
        <div className="container mt-4">
            <h1 className="mb-3">
                {isEdit ? "Editar propiedad" : "Nueva propiedad"}
            </h1>

            <form onSubmit={handleSubmit} className="row g-3">

                <div className="col-md-4">
                    <label className="form-label">Título</label>
                    <input
                        className="form-control"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                    />
                </div>

                <div className="col-md-4">
                    <label className="form-label">Descripción</label>
                    <input
                        className="form-control"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    />
                </div>

                <div className="col-md-4">
                    <label className="form-label">Ciudad</label>
                    <input
                        className="form-control"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                    />
                </div>

                <div className="col-md-4">
                    <label className="form-label">Precio</label>
                    <input
                        className="form-control"
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                    />
                </div>

                <div className="col-md-4">
                    <label className="form-label">Ambientes</label>
                    <input
                        className="form-control"
                        type="number"
                        name="rooms"
                        value={formData.rooms}
                        onChange={handleChange}
                    />
                </div>

                <div className="col-md-4">
                    <label className="form-label">Metros cuadrados</label>
                    <input
                        className="form-control"
                        type="number"
                        name="area"
                        value={formData.area}
                        onChange={handleChange}
                    />
                </div>

                <div className="col-md-4">
                    <label className="form-label">Tipo</label>
                    <select
                        className="form-select"
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                    >
                        <option value="sale">Venta</option>
                        <option value="rent">Alquiler</option>
                    </select>
                </div>

                <div className="col-12">
                    <div className="form-check mt-2">
                        <input
                            type="checkbox"
                            name="featured"
                            checked={formData.featured}
                            onChange={handleChange}
                            className="form-check-input"
                        />
                        <label className="form-check-label">
                            Propiedad destacada
                        </label>
                    </div>
                </div>

                <div className="col-12">
                    <button className="btn btn-primary" disabled={loading}>
                        {loading
                            ? "Guardando..."
                            : isEdit
                                ? "Actualizar propiedad"
                                : "Crear propiedad"}
                    </button>
                </div>

            </form>
        </div>
    );
};

export default PropertyForm;