import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../../assets/logo.jpeg";
import { isEmpty, isValidEmail } from "../../utils/validation";
import { useAuth } from "../../context/UseAuth.jsx";



const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  // State
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Handlers
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // limpiar errores
    setErrors((prev) => ({
      ...prev,
      [name]: "",
      general: "",
    }));
  };

  // Validación
  const validate = () => {
    const newErrors = {};

    const email = formData.email.trim().toLowerCase();
    const password = formData.password.trim();

    if (isEmpty(email)) {
      newErrors.email = "El email es obligatorio";
    } else if (!isValidEmail(email)) {
      newErrors.email = "El email no es válido";
    }

    if (isEmpty(password)) {
      newErrors.password = "La contraseña es obligatoria";
    }

    return newErrors;
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    setLoading(true);

    try {
      await login(formData.email, formData.password);
      navigate("/admin");
    } catch (error) {
        console.error("Login error:", error);
      setErrors({ general: "Credenciales incorrectas" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row min-vh-90 pt-4 align-items-center justify-content-center">
        <div className="col-12 col-sm-10 col-md-6 col-lg-4">
          <div className="card shadow p-4">
            <Link to="/" className="d-flex justify-content-center mb-3">
              <img src={logo} alt="Logo" style={{ height: "60px" }} />
            </Link>

            <span className="mb-4 align-self-center">
              Bienvenidos a Bonpland
            </span>

            <form onSubmit={handleSubmit}>
              {/* Email */}
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </div>

              {/* Password */}
              <div className="mb-3">
                <label className="form-label">Contraseña</label>
                <input
                  type="password"
                  name="password"
                  autoComplete="current-password"
                  className={`form-control ${
                    errors.password ? "is-invalid" : ""
                  }`}
                  value={formData.password}
                  onChange={handleChange}
                />
                {errors.password && (
                  <div className="invalid-feedback">{errors.password}</div>
                )}
              </div>

              {/* Error general */}
              {errors.general && (
                <p className="text-danger text-center">{errors.general}</p>
              )}

              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={loading}
              >
                {loading ? "Ingresando..." : "Ingresar"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;