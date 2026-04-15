import properties from "../../data/properties.json";
import { Link } from "react-router-dom";

const Dashboard = () => {
  //const properties = await getProperties(); Llamada real a API
  const total = properties.length;

  const today = new Date().toLocaleDateString("es-AR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "¡Buenos días!";
    if (hour < 18) return "¡Buenas tardes!";
    return "¡Buenas noches!";
  };
  const greeting = getGreeting();

  const forSale = properties.filter((p) => p.operation_type === "sale").length;
  const forRent = properties.filter((p) => p.operation_type === "rent").length;
  const featured = properties.filter((p) => p.featured).length;

  return (
    <div className="container mt-4">
      <h1>Dashboard</h1>

      <div className="mb-4 mt-3">
        <h2>{greeting}</h2>
        <p className="text-muted">
          Tenés el control total del panel de administración. Gestioná
          propiedades, destacá las más importantes y mantené tu catálogo
          actualizado.
        </p>
      </div>

      <Link to="/admin/properties" className="btn btn-primary mt-4">
        Ver propiedades
      </Link>

      <div className="row mt-4">
        <div className="col-md-3">
          <div className="card p-3 shadow-sm">
            <h5>Total propiedades</h5>
            <h2>{total}</h2>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-3 shadow-sm">
            <h5>En venta</h5>
            <h2>{forSale}</h2>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-3 shadow-sm">
            <h5>En alquiler</h5>
            <h2>{forRent}</h2>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-3 shadow-sm">
            <h5>Destacadas</h5>
            <h2>{featured}</h2>
          </div>
        </div>
      </div>
      <p className="w-100 mt-4">{today}</p>
    </div>
  );
};

export default Dashboard;
