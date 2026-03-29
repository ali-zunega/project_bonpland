import { Link } from "react-router-dom";
import "./Footer.css";
import logo from "../../assets/logo.jpeg";

const Footer = () => {
  return (
    <footer className="footer-custom text-center py-3 mt-4">
      <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center gap-2">
        {/* Logo */}
        <Link to="/" className="d-flex align-items-center text-decoration-none">
          <img src={logo} alt="Logo Bonpland" style={{ height: "40px" }} />
        </Link>

        {/* Texto */}
        <p className="mb-0 text-muted small">
          © {new Date().getFullYear()} Bonpland Propiedades
        </p>

        <p className="mb-0 text-muted small">
          Desarrollado por <strong>#idea5</strong>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
