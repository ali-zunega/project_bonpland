import React, { useState, useRef } from "react";
import "./Properties.css";
import normalizeText from "../../utils/normalizeText";
import * as bootstrap from "bootstrap";
import propertiesData from "../../data/properties.json";
import { useNavigate } from "react-router-dom";
import PropertyCard from "../../components/PropertyCard/PropertyCard";
import PropertyFilters from "../../components/PropertyFilters/PropertyFilters";

const Properties = () => {
  const filtersRef = useRef(null);
  const navigate = useNavigate();

  // Límites para el componente de filtros
  const maxPriceInData = Math.max(...propertiesData.map((p) => p.price), 0);
  const minPriceInData = Math.min(...propertiesData.map((p) => p.price), 0);

  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [filteredProperties, setFilteredProperties] = useState(propertiesData);

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

  const handleSearch = (filters) => {
    const results = propertiesData.filter((prop) => {
      // normalizamos los valores de metros cuadrados y precio para compararlos correctamente
      const minSqM = filters.minSqM !== "" ? parseInt(filters.minSqM) : 0;
      const maxSqM =
        filters.maxSqM !== "" ? parseInt(filters.maxSqM) : Infinity;

      const priceFilter = parseInt(filters.price) || Infinity;

      // Si la propiedad no tiene un valor definido para sqM o price,
      // lo tratamos como 0 para evitar errores de comparación
      const propSqM = prop.area || 0;
      const propPrice = prop.price || 0;

      const matchesRooms =
        filters.rooms === "" ||
        (filters.rooms === "4"
          ? prop.rooms >= 4
          : prop.rooms === parseInt(filters.rooms));

      const matchesCountry =
        filters.country === "" ||
        normalizeText(prop.country).includes(normalizeText(filters.country));

      const matchesCity =
        filters.city === "" ||
        normalizeText(prop.city).includes(normalizeText(filters.city));

      // asignamos elementos que cumplen con los filtros
      const matchesMinSqM = propSqM >= minSqM;
      const matchesMaxSqM = propSqM <= maxSqM;

      const matchesPrice = propPrice <= priceFilter;

      const matchesType =
        filters.type === "" ||
        prop.type.toLowerCase() === filters.type.toLowerCase();

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

  const closeFilters = () => {
    const el = filtersRef.current;
    if (el && window.innerWidth < 992) {
      const bsCollapse =
        bootstrap.Collapse.getInstance(el) ||
        new bootstrap.Collapse(el, { toggle: false });
      bsCollapse.hide();
    }
    setIsFiltersOpen(false);
  };

  return (
    <div className="container-fluid mt-2 px-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="d-flex flex-column align-items-center w-100 py-2">
          <h2 className="fw-bold mb-2">Propiedades Disponibles</h2>
          <p className="text-muted">Encuentra tu próximo hogar con nosotros</p>
          <div
            className="bg-primary mt-2"
            style={{ height: "3px", width: "80px", borderRadius: "2px" }}
          ></div>
        </div>

        <button
          className="btn btn-outline-primary d-flex align-items-center gap-2 d-lg-none shadow-sm"
          type="button"
          onClick={handleToggleFilters}
        >
          <i className={`bi ${isFiltersOpen ? "bi-x-lg" : "bi-sliders2"}`}></i>
        </button>
      </div>

      <div className="row g-4">
        <aside className="col-12 col-lg-3">
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

        <div className="col-12 col-lg-9">
          {/* Contador de resultados: solo se muestra si hay datos en la base */}

          {propertiesData.length > 0 && (
            <p className="text-muted mb-3">
              Mostrando <strong>{filteredProperties.length}</strong> de{" "}
              <strong>{propertiesData.length}</strong> propiedades
            </p>
          )}

          <div className="row g-4">
            {/* Estados de json de propiedades */}
            {/* 1ro - no tiene propiedades cargadas - VACIO */}
            {propertiesData.length === 0 ? (
              <div className="text-center py-5 w-100">
                <i
                  className="bi bi-house-x"
                  style={{ fontSize: "3rem", color: "#abaaaa" }}
                ></i>
                <h3 className="mt-3 text-muted">
                  No hay propiedades disponibles
                </h3>
                <p>Pronto agregaremos nuevas propiedades.</p>
              </div>
            ) : filteredProperties.length === 0 ? (
              /*2do - tiene propiedades pero no coinciden con los filtros */
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
            ) : (
              /* 3ro - mapea las propiedades que coinciden con el/los filtros */
              filteredProperties.map((property) => (
                <div
                  key={property.id}
                  className="col-12 col-sm-6 col-lg-4 d-flex"
                >
                  <PropertyCard
                    property={property}
                    onClick={() => navigate(`/properties/${property.id}`)}
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Properties;
