import { BrowserRouter, Routes, Route } from "react-router-dom";

// Público
import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import Login from "../pages/Login/Login";
import Properties from "../pages/Properties/Properties";
import PropertyDetails from "../pages/PropertyDetails/PropertyDetails";

// Admin
import Dashboard from "../admin/Dashboard/Dashboard";
import PropertyList from "../admin/PropertyList/PropertyList";
import PropertyForm from "../admin/PropertyForm/PropertyForm";

export default function AppRouter() {
    return (
    <BrowserRouter>
        <Routes>

        {/* Rutas públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />

        <Route path="/properties" element={<Properties />} />
        <Route path="/properties/:id" element={<PropertyDetails />} />

        {/* Rutas admin */}
        <Route path="admin">
            <Route index element={<Dashboard />} />
            <Route path="properties" element={<PropertyList />} />
            <Route path="properties/new" element={<PropertyForm />} />
            <Route path="properties/:id/edit" element={<PropertyForm />} />
        </Route>

        {/* fallback */}
        <Route path="*" element={<h1>404 Not Found</h1>} />

        </Routes>
    </BrowserRouter>
    );
}