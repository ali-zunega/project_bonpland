import useContactForm from "../../hooks/useContactForm";

const ContactForm = ({ property }) => {
  const {
    formData,
    errors,
    loading,
    success,
    reason,
    handleChange,
    handleSubmit,
    title,
  } = useContactForm(property);

  return (
    <div className="contact-form p-4 shadow-sm rounded w-100 w-lg-75 mx-auto">
      <h3 className="mb-3 fw-bold">{title}</h3>

      {/*si viene del boton en PropertyDetails - info de propiedad */}
      {property && (
        <div className="alert alert-info">
          <div>
            <strong>Propiedad:</strong> {property?.title}
          </div>
          <div>
            <strong>Referencia:</strong> #{property?.reference}
          </div>
        </div>
      )}

      {/* Mensaje de éxito */}
      {success && (
        <div className="alert alert-success d-flex align-items-center gap-2">
          <i className="bi bi-check-circle-fill"></i>
          <span>Tu consulta fue enviada correctamente</span>
        </div>
      )}
      <p className="text-muted">
        {property
          ? "Consultá por esta propiedad y te responderemos a la brevedad."
          : "Completá el formulario y nos pondremos en contacto con vos."}
      </p>

      {/* Formulario */}
      <form onSubmit={handleSubmit}>
        {/* Nombre */}
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            name="name"
            className={`form-control ${errors.name ? "is-invalid" : ""}`}
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
        </div>

        {/* Email */}
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && (
            <div className="invalid-feedback">{errors.email}</div>
          )}
        </div>
        {/* Teléfono */}
        <div className="mb-3">
          <label className="form-label">Teléfono (opcional)</label>
          <input
            type="tel"
            name="phone"
            className="form-control"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        {/* Motivo */}
        <div className="mb-3">
          <label className="form-label">Motivo de contacto</label>
          <select
            name="reason"
            className="form-select"
            value={reason}
            onChange={handleChange}
            disabled={!!property}
          >
            <option value="">Seleccionar</option>
            <option value="buy">Comprar</option>
            <option value="sell">Vender</option>
            <option value="rent">Alquilar</option>
          </select>
        </div>

        {/* Mensaje */}
        <div className="mb-3">
          <label className="form-label">Mensaje</label>
          <textarea
            name="message"
            rows="4"
            className={`form-control ${errors.message ? "is-invalid" : ""}`}
            value={formData.message}
            onChange={handleChange}
          />
          {errors.message && (
            <div className="invalid-feedback">{errors.message}</div>
          )}
        </div>
        {/* El botón de envío se deshabilita mientras se está "enviando" el mensaje */}
        <button type="submit" className="btn btn-brand" disabled={loading}>
          {loading ? "Enviando..." : "Enviar consulta"}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
