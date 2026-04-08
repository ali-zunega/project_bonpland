import React, { useState } from "react";
import normalizeText from "../../utils/normalizeText";
import { useRef } from "react";
import * as bootstrap from "bootstrap";
import propertiesData from "../../data/properties.json"; // Renombrado para evitar confusión
import { useNavigate } from "react-router-dom";
import PropertyCard from "../../components/PropertyCard/PropertyCard";
import PropertyFilters from "../../components/PropertyFilters/PropertyFilters";

const Properties = () => {
  const filtersRef = useRef(null);
  const navigate = useNavigate();
  // Calculamos el precio máximo real de tus datos
  const maxPriceInData = Math.max(...propertiesData.map((p) => p.price), 0);
  const minPriceInData = Math.min(...propertiesData.map((p) => p.price), 0);

  // manejo cierre del toggle de filtros
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const handleToggleFilters = () => {
    const el = filtersRef.current;
    if (!el) return;

    let bsCollapse = bootstrap.Collapse.getInstance(el);

    if (!bsCollapse) {
      bsCollapse = new bootstrap.Collapse(el, { toggle: false });
    }

    bsCollapse.toggle();
    setIsFiltersOpen((prev) => !prev);
  };

  // Estado para las propiedades que se muestran en pantalla
  const [filteredProperties, setFilteredProperties] = useState(propertiesData);

  const handleSearch = (filters) => {
    const results = propertiesData.filter((prop) => {
      // 1. Filtro por Ambientes (si es "4", buscamos 4 o más)
      const matchesRooms =
        filters.rooms === "" ||
        (filters.rooms === "4"
          ? prop.rooms >= 4
          : prop.rooms === parseInt(filters.rooms));

      // 2. Filtro por País (case insensitive)
      const matchesCountry =
        filters.country === "" ||
        normalizeText(prop.country).includes(normalizeText(filters.country));

      // 3. Filtro por Ciudad
      const matchesCity =
        filters.city === "" ||
        normalizeText(prop.city).includes(normalizeText(filters.city));

      // 4. Filtro por Metros Cuadrados
      const matchesMinSqM =
        filters.minSqM === "" || prop.sqM >= parseInt(filters.minSqM);
      const matchesMaxSqM =
        filters.maxSqM === "" || prop.sqM <= parseInt(filters.maxSqM);

      // 5. Filtro por Precio Máximo
      const matchesPrice = prop.price <= parseInt(filters.price);

      // 6. Filtro por Tipo (Alquiler/Compra)
      const matchesType =
        filters.type === "" ||
        prop.type.toLowerCase() === filters.type.toLowerCase();
      // console.log(prop.type);

      // Solo si cumple todas las condiciones
      return (
        matchesRooms &&
        matchesCountry &&
        matchesCity &&
        matchesMinSqM &&
        matchesMaxSqM &&
        matchesPrice &&
        matchesType
      );
    });

    setFilteredProperties(results);
    closeFilters();
  };
  // cierra filtros al apretar buscar
  const closeFilters = () => {
    const el = filtersRef.current;

    if (el && window.innerWidth < 992) {
      const bsCollapse =
        bootstrap.Collapse.getInstance(el) ||
        new bootstrap.Collapse(el, { toggle: false });

      bsCollapse.hide();
    }

    setIsFiltersOpen(false); // 🔥 esto es clave
  };

  return (
    <div className="container-fluid mt-2 px-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="d-flex flex-column align-items-center w-100 py-2">
          <h2 className="fw-bold mb-2">Propiedades Disponibles</h2>
          <p className="text-muted">Encuentra tu próximo hogar con nosotros</p>
          {/* este div es la linea  */}
          <div
            className="bg-primary mt-2"
            style={{ height: "3px", width: "80px", borderRadius: "2px" }}
          ></div>
        </div>

        {/* Botón visible SOLO en móviles (d-lg-none) */}
        <button
          className="btn btn-outline-primary d-flex align-items-center gap-2 d-lg-none shadow-sm"
          type="button"
          onClick={handleToggleFilters}
        >
          <i className={`bi ${isFiltersOpen ? "bi-x-lg" : "bi-sliders2"}`}></i>
          {/* <span className="d-none d-sm-inline">
            {isFiltersOpen ? "Cerrar" : "Filtros"}
          </span> */}
        </button>
      </div>

      <div className="row g-4">
        {/* Sidebar de Filtros a la izquierda */}
        <aside className="col-12 col-lg-3">
          {/* En móvil es un colapsable, en PC está siempre visible (d-lg-block) */}
          <div
            className="collapse d-lg-block sticky-lg-top"
            id="mobileFilters"
            style={{ top: "20px" }}
            ref={filtersRef}
          >
            <PropertyFilters
              key={maxPriceInData}
              onSearch={handleSearch}
              maxLimit={maxPriceInData}
              minLimit={minPriceInData}
            />
          </div>
        </aside>

        {/* grid propiedades a la derecha */}
        <div className="col-12 col-lg-9">
          <p className="text-muted mb-3">
            {filteredProperties.length === 1
              ? "1 propiedad encontrada"
              : `${filteredProperties.length} propiedades encontradas`}
          </p>
          <div className="row g-4">
            {filteredProperties.length > 0 ? (
              filteredProperties.map((property) => (
                <div key={property.id} className="col-12 col-sm-6 col-xl-4">
                  <PropertyCard
                    property={property}
                    onClick={() => navigate(`/properties/${property.id}`)}
                  />
                </div>
              ))
            ) : (
              <div className="text-center py-5 w-100">
                <i
                  className="bi bi-search"
                  style={{ fontSize: "3rem", color: "#abaaaa" }}
                ></i>
                <h3 className="mt-3 text-muted">
                  No encontramos lo que buscas
                </h3>
                <p>Prueba ajustando los filtros o limpiando la búsqueda.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Properties;
