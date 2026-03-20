import { Outlet, Link } from "react-router-dom";

const AdminLayout = () => {
    return (
        <div style={{ display: "flex", minHeight: "100vh" }}>

            {/* Sidebar */}
            <aside style={{
                width: "220px",
                padding: "16px",
                borderRight: "1px solid #ddd"
            }}>
                <h3>Admin</h3>

                <nav style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <Link to="/admin">Dashboard</Link>
                    <Link to="/admin/properties">Propiedades</Link>
                    <Link to="/admin/properties/new">Nueva Propiedad</Link>
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