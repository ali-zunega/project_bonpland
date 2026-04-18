import React, { useState } from "react";
import "./PropertyFilters.css";
import countries from "../../data/countries.json";
import cities from "../../data/cities.json";

const PropertyFilters = ({ onSearch }) => {
  // Estado inicial para limpiar fácilmente
  const initialState = {
    rooms: "",
    countryId: "",
    cityId: "",
    minSqM: "",
    maxSqM: "",
    minPrice: "",
    maxPrice: "",
    operation_type: "",
  };

  const [filters, setFilters] = useState(initialState);

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
        {/* Select de País */}
        <div className="col-md-12">
          <label className="form-label small fw-bold" htmlFor="countryId">
            País
          </label>
          <select
            id="countryId"
            name="countryId"
            className="form-select"
            value={filters.countryId}
            onChange={handleChange}
          >
            <option value="">Selecciona un país</option>
            {countries.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Select de Ciudad */}
        <div className="col-md-12">
          <label className="form-label small fw-bold" htmlFor="cityId">
            Ciudad
          </label>
          <select
            id="cityId"
            name="cityId"
            className="form-select"
            value={filters.cityId}
            onChange={handleChange}
            disabled={!filters.countryId}
          >
            <option value="">Selecciona una ciudad</option>
            {cities
              .filter((city) => city.country_id === Number(filters.countryId))
              .map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))}
          </select>
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

        {/* Tipo Operacion */}
        <div className="col-md-12">
          <label className="form-label small fw-bold" htmlFor="operation_type">
            Operación
          </label>
          <select
            id="operation_type"
            name="operation_type"
            className="form-select"
            value={filters.operation_type}
            onChange={handleChange}
          >
            <option value="">Cualquiera</option>
            <option value="rent">Alquiler</option>
            <option value="sale">Compra</option>
          </select>
        </div>

        {/* Rango de Precios */}
        <div className="col-md-12">
          <span className="form-label d-block small fw-bold mb-2">Precio</span>

          <div className="input-group">
            <input
              id="minPrice"
              type="number"
              name="minPrice"
              className="form-control"
              placeholder="Min"
              aria-label="Precio mínimo"
              value={filters.minPrice}
              onChange={handleChange}
              min="0"
              autoComplete="off"
              onWheel={(e) => e.target.blur()}
            />
            <input
              id="maxPrice"
              type="number"
              name="maxPrice"
              className="form-control"
              placeholder="Max"
              aria-label="Precio máximo"
              value={filters.maxPrice}
              onChange={handleChange}
              min="0"
              autoComplete="off"
              onWheel={(e) => e.target.blur()}
            />
          </div>
        </div>

        {/* Botones */}
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
