import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import "./Navbar.css";
import logo from "../../assets/logo.jpeg";
import * as bootstrap from "bootstrap";

const Navbar = () => {
  // manejo del colapso de menu en mobile para cerrar cuando se hace click en algun link
  const navbarCollapseRef = useRef();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleCloseMenu = () => {
    if (!navbarCollapseRef.current) return;

    const bsCollapse = bootstrap.Collapse.getInstance(
      navbarCollapseRef.current,
    );

    if (bsCollapse) {
      bsCollapse.hide();
    }

    setIsMenuOpen(false);
  };
  const handleToggleMenu = () => {
    if (!navbarCollapseRef.current) return;

    let bsCollapse = bootstrap.Collapse.getInstance(navbarCollapseRef.current);

    if (!bsCollapse) {
      bsCollapse = new bootstrap.Collapse(navbarCollapseRef.current);
    }

    bsCollapse.toggle();
    setIsMenuOpen((prev) => !prev);
  };
  const navigate = useNavigate();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    const syncUser = () => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      setUser(storedUser);

      // 🔥 resetear estado de logout
      setIsLoggingOut(false);
    };

    syncUser();

    window.addEventListener("authChange", syncUser);

    return () => window.removeEventListener("authChange", syncUser);
  }, []);

  const handleLogout = () => {
    setIsLoggingOut(true);

    setTimeout(() => {
      localStorage.removeItem("user");

      // 🔥 avisar cambio
      window.dispatchEvent(new Event("authChange"));

      navigate("/login");
    }, 3000);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light shadow-sm sticky-top navbar-custom">
      <div className="container">
        <Link to="/" className="navbar-brand d-flex align-items-center gap-2">
          <img src={logo} alt="Logo" style={{ height: "40px" }} />
        </Link>

        <button
          className="navbar-toggler border-0 shadow-sm"
          type="button"
          onClick={handleToggleMenu}
        >
          <i
            className={`bi ${isMenuOpen ? "bi-x-lg" : "bi-list"}`}
            style={{ fontSize: "1.5rem" }}
          ></i>
        </button>

        <div
          className="collapse navbar-collapse"
          id="navbarNav"
          ref={navbarCollapseRef}
        >
          <ul className="navbar-nav ms-auto gap-lg-3 align-items-lg-center">
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

            {/* LOGIN */}
            {!user && (
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/login"
                  onClick={handleCloseMenu}
                >
                  Login
                </Link>
              </li>
            )}

            {/* ADMIN SOLO SI ES ADMIN */}
            {user?.role === "admin" && (
              <li className="nav-item">
                <Link
                  className="nav-link text-primary fw-semibold"
                  to="/admin"
                  onClick={handleCloseMenu}
                >
                  Admin
                </Link>
              </li>
            )}

            {/* LOGOUT */}
            {user && (
              <li className="nav-item">
                <button
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="btn btn-outline-danger btn-sm d-flex align-items-center gap-2"
                >
                  {isLoggingOut && (
                    <span className="spinner-border spinner-border-sm"></span>
                  )}
                  {isLoggingOut ? "Saliendo..." : "Logout"}
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
