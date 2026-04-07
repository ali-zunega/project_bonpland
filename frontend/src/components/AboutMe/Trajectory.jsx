import "./Trajectory.css";

export function Trajectory() {
  const steps = [
    {
      title: "Inicio del proyecto",
      text: "Nacimos con la visión de transformar la forma en que las personas buscan propiedades en Latinoamérica.",
    },
    {
      title: "Desarrollo de la plataforma",
      text: "Construimos una solución con listados completos, filtros avanzados y detalles claros de cada inmueble.",
    },
    {
      title: "Optimización interna",
      text: "Incorporamos herramientas de gestión para administrar propiedades de forma eficiente y actualizada.",
    },
    {
      title: "Actualidad",
      text: "Seguimos creciendo con foco en innovación, experiencia de usuario y servicio de calidad.",
    },
  ];

  return (
    <section className="container my-5 timeline-section">
      <h3 className="text-center mb-5 fw-bold">Nuestra Trayectoria</h3>

      {/* Contenedor principal relativo */}
      <div className="position-relative pb-5">

        {/* LÍNEA: Centrada con utilidades de Bootstrap */}
        <div className="timeline-line position-absolute start-50 translate-middle-x"></div>

        {steps.map((step, index) => (
          <div
            key={index}
            className={`row timeline-row mb-5 align-items-center position-relative ${index % 2 === 0 ? "" : "flex-row-reverse"
              }`}
          >
            {/* Card */}
            <div className="col-md-5">
              <div className="card shadow-sm p-4 card-timeline">
                <h5 className="fw-bold">{step.title}</h5>
                <p className="text-muted mb-0">{step.text}</p>
              </div>
            </div>

            {/* Punto */}
            <div className="timeline-dot position-absolute top-50 start-50 translate-middle rounded-circle p-0"></div>

            {/* Espaciador */}
            <div className="col-md-5 d-none d-md-block"></div>
          </div>
        ))}
      </div>
    </section>
  );
}