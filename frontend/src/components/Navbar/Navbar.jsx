import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../../assets/logo.jpeg";
import { useRef } from "react";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";

const Navbar = () => {
  // manejo del colapso de menu en mobile para cerrar cuando se hace click en algun link
  const navbarCollapseRef = useRef();

  const handleCloseMenu = () => {
    const bsCollapse = bootstrap.Collapse.getInstance(
      navbarCollapseRef.current,
    );
    if (bsCollapse) {
      bsCollapse.hide();
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light shadow-sm sticky-top navbar-custom">
      <div className="container">
        {/* Logo */}
        <Link to="/" className="navbar-brand d-flex align-items-center gap-2">
          <img src={logo} alt="Logo" style={{ height: "40px" }} />
          {/* <span className="fw-bold">Bonpland Propiedades</span> */}
        </Link>

        {/* Botón hamburguesa */}
        <button
          className="navbar-toggler border-0 shadow-sm"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Links */}
        <div
          className="collapse navbar-collapse"
          id="navbarNav"
          ref={navbarCollapseRef}
        >
          <ul className="navbar-nav ms-auto gap-lg-3">
            <li className="nav-item">
              <Link className="nav-link" to="/" onClick={handleCloseMenu}>
                Inicio
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link"
                to="/properties"
                onClick={handleCloseMenu}
              >
                Propiedades
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/about" onClick={handleCloseMenu}>
                Nosotros
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link"
                to="/contact"
                onClick={handleCloseMenu}
              >
                Contacto
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/login" onClick={handleCloseMenu}>
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link text-primary fw-semibold"
                to="/admin"
                onClick={handleCloseMenu}
              >
                Admin
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
