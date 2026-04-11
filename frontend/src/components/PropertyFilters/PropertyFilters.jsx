import React, { useState } from "react";

const PropertyFilters = ({ onSearch, maxLimit, minLimit }) => {
  // Estado inicial para limpiar fácilmente
  const initialState = {
    rooms: "",
    country: "",
    city: "",
    minSqM: "",
    maxSqM: "",
    price: maxLimit, // Se inicializa una vez al montar
    type: "",
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

    setFilters((prev) => ({
      ...prev,
      [name]: value,
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
    <form
      className="card border-1 shadow-sm p-3 bg-white"
      onSubmit={handleSubmit}
    >
      <div className="d-flex align-items-center mb-3 text-primary">
        <h5 className="m-0 fw-bold">Filtrar búsqueda</h5>
      </div>

      <div className="row g-3">
        {/* Ambientes */}
        <div className="col-md-12">
          <label className="form-label small fw-bold" htmlFor="rooms">
            Ambientes
          </label>
          <select
            id="rooms"
            name="rooms"
            className="form-select"
            value={filters.rooms}
            onChange={handleChange}
          >
            <option value="">Todos</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4+</option>
          </select>
        </div>

        {/* País y Ciudad */}
        <div className="col-md-12">
          <label className="form-label small fw-bold" htmlFor="country">
            País
          </label>
          <input
            type="text"
            id="country"
            name="country"
            className="form-control"
            placeholder="Ej: Argentina"
            value={filters.country}
            onChange={handleChange}
            autoComplete="country-name"
          />
        </div>
        <div className="col-md-12">
          <label className="form-label small fw-bold" htmlFor="city">
            Ciudad
          </label>
          <input
            type="text"
            id="city"
            name="city"
            className="form-control"
            placeholder="Ej: Buenos Aires"
            value={filters.city}
            onChange={handleChange}
            autoComplete="address-level2"
          />
        </div>

        {/* Metros Cuadrados */}
        <div className="col-md-12">
          <span className="form-label d-block small fw-bold mb-2">
            Superficie (m²)
          </span>

          <div className="input-group">
            <input
              id="minSqM"
              type="number"
              name="minSqM"
              className="form-control"
              placeholder="Min"
              aria-label="Superficie mínima en metros cuadrados"
              value={filters.minSqM}
              onChange={handleChange}
              min="0"
              autoComplete="off"
              onWheel={(e) => e.target.blur()}
            />
            <input
              id="maxSqM"
              type="number"
              name="maxSqM"
              className="form-control"
              placeholder="Max"
              aria-label="Superficie máxima en metros cuadrados"
              value={filters.maxSqM}
              onChange={handleChange}
              autoComplete="off"
              onWheel={(e) => e.target.blur()}
            />
          </div>
        </div>

        {/* Tipo */}
        <div className="col-md-12">
          <label className="form-label small fw-bold" htmlFor="type">
            Operación
          </label>
          <select
            id="type"
            name="type"
            className="form-select"
            value={filters.type}
            onChange={handleChange}
          >
            <option value="">Cualquiera</option>
            <option value="rent">Alquiler</option>
            <option value="sale">Compra</option>
          </select>
        </div>

        {/* Rango de Precios */}
        <div className="col-12 mt-4">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <label className="form-label small fw-bold mb-0" htmlFor="price">
              Precio máximo
            </label>
            <span className="text-primary fw-bold small">
              {new Intl.NumberFormat("es-AR", {
                style: "currency",
                currency: "ARS",
                maximumFractionDigits: 0,
              }).format(currentPrice)}{" "}
              {/* <--- Usamos tu constante aquí */}
            </span>
          </div>

          <input
            id="price"
            type="range"
            name="price"
            className="form-range custom-slider"
            min={minLimit}
            max={maxLimit}
            step={maxLimit > 100000 ? 10000 : 100}
            value={currentPrice} // <--- Y aquí también
            onChange={handleChange}
            autoComplete="off"
          />
        </div>
        <div className="col-12 mt-4 d-grid gap-2">
          <button type="submit" className="btn btn-primary fw-bold py-2">
            Aplicar filtros
          </button>
          <button
            type="button"
            className="btn btn-light text-muted btn-sm"
            onClick={handleReset}
          >
            Restablecer valores
          </button>
        </div>
      </div>
    </form>
  );
};

export default PropertyFilters;
