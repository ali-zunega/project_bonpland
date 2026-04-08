import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.jpeg";

const Login = () => {
  /*const roles = [
        { id: "admin", name: "Administrador" },
        { id: "agent", name: "Agente" },
    ];*/
  const users = [
    {
      email: "admin@bonpland.com",
      password: "123456",
      role: "admin",
    },
    {
      email: "user@bonpland.com",
      password: "123456",
      role: "user",
    },
  ];
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const userFound = users.find(
      (user) =>
        user.email === formData.email && user.password === formData.password,
    );

    localStorage.setItem("user", JSON.stringify(userFound));

    // 🔥 dispara actualización global
    window.dispatchEvent(new Event("authChange"));

    navigate("/admin");

    if (userFound) {
      localStorage.setItem("auth", "true");
      localStorage.setItem("role", userFound.role);

      if (userFound.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/admin"); // después podés separar rutas
      }
    } else {
      setError("Credenciales incorrectas");
    }
  };

  return (
    <>
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
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Contraseña</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                {error && <p className="text-danger">{error}</p>}

                <button type="submit" className="btn btn-primary w-100">
                  Ingresar
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
