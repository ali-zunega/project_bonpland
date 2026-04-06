import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Navbar.css";
import logo from "../../assets/logo.jpeg";

const Navbar = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("user"))
    );
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
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto gap-lg-3 align-items-lg-center">

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

                        {/* LOGIN */}
                        {!user && (
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">Login</Link>
                            </li>
                        )}

                        {/* ADMIN SOLO SI ES ADMIN */}
                        {user?.role === "admin" && (
                            <li className="nav-item">
                                <Link className="nav-link text-primary fw-semibold" to="/admin">
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