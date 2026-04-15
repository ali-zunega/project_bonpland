import { Routes, Route } from "react-router-dom";

// Público
import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import Login from "../pages/Login/Login";
import Properties from "../pages/Properties/Properties";
import PropertyDetails from "../pages/PropertyDetails/PropertyDetails";
import PublicRoute from "./PublicRoute";

// Admin
import AdminLayout from "../admin/Layout/AdminLayout";
import Dashboard from "../admin/Dashboard/Dashboard";
import PropertyList from "../admin/PropertyList/PropertyList";
import PropertyForm from "../admin/PropertyForm/PropertyForm";
import PrivateRoute from "../app/PrivateRoute";

export default function AppRouter() {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={ <PublicRoute>
      <Login />
    </PublicRoute>} />

      <Route path="/properties" element={<Properties />} />
      <Route path="/properties/:id" element={<PropertyDetails />} />

      {/* Rutas admin */}

      <Route
        path="/admin"
        element={
          <PrivateRoute allowedRoles={["admin"]}>
            <AdminLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="properties" element={<PropertyList />} />
        <Route path="properties/new" element={<PropertyForm />} />
        <Route path="properties/:id/edit" element={<PropertyForm />} />
      </Route>

      {/* fallback */}
      <Route path="*" element={<h1>404 Not Found</h1>} />
    </Routes>
  );
}
