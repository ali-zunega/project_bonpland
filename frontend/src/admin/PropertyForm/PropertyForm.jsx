import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import properties from "../../data/properties.json";

const PropertyForm = () => {
    const { id } = useParams();
    const isEdit = Boolean(id);
    const navigate = useNavigate();
    const propertyToEdit = properties.find(
        (p) => p.id === Number(id)
    );

    const [formData, setFormData] = useState(
        isEdit && propertyToEdit
            ? propertyToEdit
            :
            {
                title: "",
                description: "",
                country: "",
                city: "",
                price: "",
                area: "",
                rooms: "",
                status: "",
                type: "",
                featured: false,
            });



    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox"
                ? checked
                : type === "number"
                    ? Number(value)
                    : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isEdit) {
            console.log("EDITAR", formData);
        } else {
            console.log("CREAR", formData);
        }

        navigate("/admin/properties", { replace: true });
    };

    return (
        <div className="container mt-4">
            <h1 className="mb-3">{isEdit ? "Editar propiedad" : "Nueva propiedad"}</h1>

            <form onSubmit={handleSubmit} className="row g-3">

                <div className="col-md-4">
                    <label className="form-label">Título</label>
                    <input className="form-control" name="title" placeholder="Ej: Casa moderna" value={formData.title} onChange={handleChange} />
                </div>

                <div className="col-md-4">
                    <label className="form-label">Descripción</label>
                    <input className="form-control" name="description" placeholder="Breve descripción" value={formData.description} onChange={handleChange} />
                </div>

                <div className="col-md-4">
                    <label className="form-label">Ciudad</label>
                    <input className="form-control" name="city" placeholder="Ej: Buenos Aires" value={formData.city} onChange={handleChange} />
                </div>

                <div className="col-md-4">
                    <label className="form-label">Precio</label>
                    <input className="form-control" type="number" name="price" placeholder="Ej: 150000" value={formData.price} onChange={handleChange} />
                </div>

                <div className="col-md-4">
                    <label className="form-label">Ambientes</label>
                    <input className="form-control" type="number" name="rooms" placeholder="Ej: 3" value={formData.rooms} onChange={handleChange} />
                </div>

                <div className="col-md-4">
                    <label className="form-label">Metros cuadrados</label>
                    <input className="form-control" type="number" name="area" placeholder="Ej: 80" value={formData.area} onChange={handleChange} />
                </div>

                <div className="col-md-4">
                    <label className="form-label">Tipo</label>
                    <select className="form-select" name="type" value={formData.type} onChange={handleChange}>
                        <option value="sale">Venta</option>
                        <option value="rent">Alquiler</option>
                    </select>
                </div>

                <div className="col-12">
                    <div className=" form-check mt-2">
                        <input
                            type="checkbox"
                            name="featured"
                            checked={formData.featured}
                            onChange={handleChange}
                            className="form-check-input border border-secondary"
                        />
                        <label className="form-check-label">Propiedad destacada</label>
                    </div>
                </div>

                <div className="col-12">
                    <button className="btn btn-primary">
                        {isEdit ? "Actualizar propiedad" : "Crear propiedad"}
                    </button>
                </div>

            </form>
        </div>
    );
};

export default PropertyForm;