import React, { useState } from 'react';

const PropertyFilters = ({ onSearch, maxLimit, minLimit }) => {
    // Estado inicial para limpiar fácilmente
    const initialState = {
        rooms: '',
        country: '',
        city: '',
        minSqM: '',
        maxSqM: '',
        price: maxLimit, // Se inicializa una vez al montar
        type: ''
    };

    const [filters, setFilters] = useState(initialState);

    // Si el usuario no movió el slider, queremos que 'price' sea maxLimit
    // Pero si lo movió, queremos respetar su elección.
    // Usaremos un valor "fallback" para el slider:
    const currentPrice = filters.price || maxLimit;

    const handleChange = (e) => {
        const { name, value, type } = e.target;

        // Validación para que no acepten números negativos
        if (type === "number" && value < 0) {
            return; // Bloquea el cambio si es negativo
        }

        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Función para resetear los filtros a su estado inicial
    const handleReset = () => {
        setFilters(initialState);
        onSearch(initialState);
    };
    // Cuando el formulario se envía, llamamos a onSearch con los filtros actuales
    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(filters);
    };


    return (
        <form className="card border-1 shadow-sm p-3 bg-white" onSubmit={handleSubmit}>

            <div className="d-flex align-items-center mb-3 text-primary">
                <i className="bi bi-sliders2 me-2"></i>
                <h5 className="m-0 fw-bold">Filtrar búsqueda</h5>
            </div>

            <div className="row g-3">
                {/* Ambientes */}
                <div className="col-md-12">
                    <label className="form-label small fw-bold">Ambientes</label>
                    <select name="rooms" className="form-select" value={filters.rooms} onChange={handleChange}>
                        <option value="">Todos</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4+</option>
                    </select>
                </div>

                {/* País y Ciudad */}
                <div className="col-md-12">
                    <label className="form-label small fw-bold">País</label>
                    <input name="country" className="form-control" placeholder="Ej: Argentina" value={filters.country} onChange={handleChange} />
                </div>
                <div className="col-md-12">
                    <label className="form-label small fw-bold">Ciudad</label>
                    <input name="city" className="form-control" placeholder="Ej: Buenos Aires" value={filters.city} onChange={handleChange} />
                </div>

                {/* Metros Cuadrados */}
                <div className="col-md-12">
                    <label className="form-label small fw-bold">Superficie (m²)</label>
                    <div className="input-group">
                        <input type="number" name="minSqM" className="form-control" placeholder="Min" value={filters.minSqM} onChange={handleChange} min="0" />
                        <input type="number" name="maxSqM" className="form-control" placeholder="Max" value={filters.maxSqM} onChange={handleChange} />
                    </div>
                </div>

                {/* Tipo */}
                <div className="col-md-12">
                    <label className="form-label small fw-bold">Operación</label>
                    <select name="type" className="form-select" value={filters.type} onChange={handleChange}>
                        <option value="">Cualquiera</option>
                        <option value="alquiler">Alquiler</option>
                        <option value="compra">Compra</option>
                    </select>
                </div>

                {/* Rango de Precios */}
                <div className="col-12 mt-4">
                    <label className="form-label small fw-bold d-flex justify-content-between w-100">
                        Precio máximo:
                        <span className="text-primary">
                            {new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(filters.price)}
                        </span>
                    </label>
                    <input
                        type="range"
                        name="price"
                        className="form-range custom-slider"
                        min={minLimit}
                        max={maxLimit}
                        step={maxLimit > 100000 ? 10000 : 100}
                        value={currentPrice} // Usamos la variable calculada
                        onChange={handleChange}
                    />
                </div>
                <div className="col-12 mt-4 d-grid gap-2">
                    <button type="submit" className="btn btn-primary fw-bold py-2">
                        Aplicar filtros
                    </button>
                    <button type="button" className="btn btn-light text-muted btn-sm" onClick={handleReset}>
                        Restablecer valores
                    </button>
                </div>
            </div>

        </form>
    );
};

export default PropertyFilters;