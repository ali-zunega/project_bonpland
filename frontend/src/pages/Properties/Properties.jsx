import React, { useState, useRef, useEffect } from "react";
import "./Properties.css";
import { propertyService } from "../../services/propertyService";

import * as bootstrap from "bootstrap";
import { useNavigate } from "react-router-dom";
import PropertyCard from "../../components/PropertyCard/PropertyCard";
import PropertyFilters from "../../components/PropertyFilters/PropertyFilters";

const Properties = () => {
  const filtersRef = useRef(null);
  const navigate = useNavigate();

  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const [filters, setFilters] = useState({
    page: 1,
    limit: 9,
  });

  const [totalPages, setTotalPages] = useState(1);

  const [properties, setProperties] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  // Fetch de propiedades (simula backend)
  useEffect(() => {
    const loadProperties = async () => {
      setLoading(true);

      const res = await propertyService.fetchProperties(filters);
      setProperties(res.data);

      setTotal(res.total);
      setTotalPages(res.totalPages);

      setLoading(false);
    };

    loadProperties();
  }, [filters]);

  {
    /* Handlers de Paginación */
  }
  const goToPage = (page) => {
    setFilters((prev) => ({
      ...prev,
      page,
    }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const nextPage = () => {
    if (filters.page < totalPages) {
      goToPage(filters.page + 1);
    }
  };

  const prevPage = () => {
    if (filters.page > 1) {
      goToPage(filters.page - 1);
    }
  };

  // Toggle filtros mobile
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

  //  Aplicar filtros
  const handleSearch = (newFilters) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
      page: 1, // reset paginación
    }));

    closeFilters();
  };

  //  Cerrar filtros en mobile
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
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="d-flex flex-column align-items-center w-100 py-2">
          <h2 className="fw-bold mb-2">Propiedades Disponibles</h2>
          <p className="text-muted">Encuentra tu próximo hogar con nosotros</p>
          <div
            className="bg-primary mt-2"
            style={{ height: "3px", width: "80px", borderRadius: "2px" }}
          />
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
        {/* Sidebar filtros */}
        <aside className="col-12 col-lg-3">
          <div
            className="collapse d-lg-block sticky-lg-top"
            id="mobileFilters"
            style={{ top: "20px" }}
            ref={filtersRef}
          >
            <PropertyFilters onSearch={handleSearch} />
          </div>
        </aside>

        {/* Listado */}
        <div className="col-12 col-lg-9">
          {/* Loading */}
          {loading ? (
            <div className="d-flex flex-column justify-content-center align-items-center py-5">
              <div
                className="spinner spinner-border mb-3 text-secondary"
                role="status"
                aria-hidden="true"
              ></div>
              <strong>Cargando propiedades...</strong>
            </div>
          ) : (
            <>
              {/* Contador */}
              {total > 0 && (
                <p className="text-muted mb-3">
                  Mostrando <strong>{properties.length}</strong> de{" "}
                  <strong>{total}</strong> propiedades
                </p>
              )}

              <div className="row g-4">
                {/* Sin resultados */}
                {properties.length === 0 ? (
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
                  /* Resultados */
                  properties.map((property) => (
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
            </>
          )}

          {totalPages > 1 && (
            <div className="d-flex justify-content-center align-items-center gap-2 mt-4 flex-wrap">
              <button
                className="btn btn-outline-primary btn-sm"
                onClick={prevPage}
                disabled={filters.page === 1}
              >
                Anterior
              </button>

              {[...Array(totalPages)].map((_, i) => {
                const pageNumber = i + 1;

                return (
                  <button
                    key={pageNumber}
                    className={`btn btn-sm ${
                      filters.page === pageNumber
                        ? "btn-primary"
                        : "btn-outline-primary"
                    }`}
                    onClick={() => goToPage(pageNumber)}
                  >
                    {pageNumber}
                  </button>
                );
              })}

              <button
                className="btn btn-outline-primary btn-sm"
                onClick={nextPage}
                disabled={filters.page === totalPages}
              >
                Siguiente
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Properties;
