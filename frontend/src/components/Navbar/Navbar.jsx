import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../../assets/logo.jpeg";

const Navbar = () => {
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
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto gap-lg-3">

            <li className="nav-item">
              <Link className="nav-link" to="/">Inicio</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/properties">Propiedades</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/about">Nosotros</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/contact">Contacto</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/login">Login</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link text-primary fw-semibold" to="/admin">
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