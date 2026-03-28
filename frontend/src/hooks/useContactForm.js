import { useState } from "react";

const useContactForm = (property) => {
  const isPropertyContact = !!property;

  // setea el formulario con un mensaje predefinido si viene de PropertyDetails, sino vacío
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    reason: "",
    message: property
      ? `Hola, me interesa la propiedad ${property?.reference} (${property?.title}).`
      : "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Si la consulta viene de una propiedad,
  // el motivo se setea automáticamente según el tipo de propiedad
  const reason = property
    ? property.type === "sale"
      ? "buy"
      : "rent"
    : formData.reason;

  const title = isPropertyContact ? "Consulta por propiedad" : "Contacto";

  const handleChange = (e) => {
    const { name, value } = e.target;

    // evitar que se modifique el reason si viene de property
    if (property && name === "reason") return;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Validación simple,
  // solo verifica que los campos requeridos no estén vacíos
  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "El nombre es obligatorio";
    if (!formData.email.trim()) newErrors.email = "El email es obligatorio";
    if (!formData.message.trim())
      newErrors.message = "El mensaje es obligatorio";

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    // Aquí se construiría el payload a enviar al backend
    const payload = {
      ...formData,
      propertyId: property?.id || null,
      propertyReference: property?.reference || null,
      phone: formData.phone || null,
      reason: property
        ? property.type === "sale"
          ? "buy"
          : "rent"
        : formData.reason,
    };

    console.log("Mensaje a enviar:", payload);

    // simulación de envío con retraso
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);

      setTimeout(() => setSuccess(false), 5000);
      // reseteo de formulario
      setFormData({
        name: "",
        email: "",
        phone: "",
        reason: "",
        message: "",
      });

      setErrors({});
    }, 1500);
  };

  return {
    formData,
    errors,
    loading,
    success,
    title,
    reason,
    handleChange,
    handleSubmit,
  };
};

export default useContactForm;
