import { useState } from "react";
import { isValidEmail, isEmpty } from "../utils/validation";

const useContactForm = (property) => {
  const isPropertyContact = !!property;

  // Helpers
  const getDefaultMessage = () => {
    if (!property) return "";
    return `Hola, me interesa la propiedad ${property?.reference} (${property?.title}).`;
  };

  const getReasonFromProperty = () => {
    if (!property) return null;
    return property.type === "sale" ? "buy" : "rent";
  };

  // State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    reason: "",
    message: getDefaultMessage(),
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  //  Derived values
  const reason = isPropertyContact ? getReasonFromProperty() : formData.reason;

  const title = isPropertyContact ? "Consulta por propiedad" : "Contacto";

  //  Handlers
  const handleChange = (e) => {
    const { name, value } = e.target;

    // evitar modificar reason si viene de property
    if (isPropertyContact && name === "reason") return;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // limpiar error del campo en tiempo real
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  //  Validación
  const validate = () => {
    const newErrors = {};

    const name = formData.name.trim();
    const email = formData.email.trim();
    const message = formData.message.trim();
    const phone = formData.phone.trim();

    // Nombre
    if (isEmpty(name)) {
      newErrors.name = "El nombre es obligatorio";
    }

    // Email
    if (isEmpty(email)) {
      newErrors.email = "El email es obligatorio";
    } else if (!isValidEmail(email)) {
      newErrors.email = "El email no es válido";
    }

    // Mensaje
    if (isEmpty(message)) {
      newErrors.message = "El mensaje es obligatorio";
    } else if (message.length < 10) {
      newErrors.message = "Debe tener al menos 10 caracteres";
    }

    // Motivo (solo si no viene de propiedad)
    if (!isPropertyContact && isEmpty(formData.reason)) {
      newErrors.reason = "Seleccioná un motivo";
    }

    // Teléfono (opcional)
    if (phone && phone.length < 6) {
      newErrors.phone = "Teléfono inválido";
    }

    return newErrors;
  };

  //  Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    //  Payload
    const payload = {
      ...formData,
      propertyId: property?.id || null,
      propertyReference: property?.reference || null,
      phone: formData.phone || null,
      reason: reason,
    };

    console.log("Mensaje a enviar:", payload);

    //  Simulación de envío
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);

      // ocultar mensaje de éxito
      setTimeout(() => setSuccess(false), 5000);

      // reset form
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
