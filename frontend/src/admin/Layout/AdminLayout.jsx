import { Outlet, Link } from "react-router-dom";
import "./AdminLayout.css";

const AdminLayout = () => {
    return (
        <div className="sidebar-container d-flex min-h-screen">

            {/* Sidebar */}
            <aside className="sidebar">
                <h3>Admin</h3>
                <nav className="sidebar-nav d-flex flex-column gap-2">
                    <Link className="sidebar-link" to="/admin">Dashboard</Link>
                    <Link className="sidebar-link" to="/admin/properties/new">Nueva Propiedad</Link>
                    <Link className="sidebar-link" to="/admin/properties">Propiedades</Link>
                </nav>
            </aside>

            {/* Contenido dinámico */}
            <main style={{ flex: 1, padding: "20px" }}>
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;