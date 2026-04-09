import { useState } from "react";
import { isValidEmail, isEmpty } from "../utils/validation";
import { FIELD_LIMITS } from "../utils/constants";

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

  // Derived values
  const reason = isPropertyContact ? getReasonFromProperty() : formData.reason;
  const title = isPropertyContact ? "Consulta por propiedad" : "Contacto";

  // Handlers
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (isPropertyContact && name === "reason") return;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // limpiar error del campo
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  // Validación
  const validate = () => {
    const newErrors = {};

    const name = formData.name.trim();
    const email = formData.email.trim();
    const message = formData.message.trim();
    const phone = formData.phone.trim();

    // Nombre
    if (isEmpty(name)) {
      newErrors.name = "El nombre es obligatorio";
    } else if (name.length > FIELD_LIMITS.CONTACT_NAME) {
      newErrors.name = `Máximo ${FIELD_LIMITS.CONTACT_NAME} caracteres`;
    }

    // Email
    if (!isValidEmail(email)) {
      newErrors.email = isEmpty(email)
        ? "El email es obligatorio"
        : "El email no es válido";
    }

    // Mensaje
    if (isEmpty(message)) {
      newErrors.message = "El mensaje es obligatorio";
    } else if (message.length < 10) {
      newErrors.message = "Debe tener al menos 10 caracteres";
    } else if (message.length > FIELD_LIMITS.CONTACT_MESSAGE) {
      newErrors.message = `Máximo ${FIELD_LIMITS.CONTACT_MESSAGE} caracteres`;
    }

    // Motivo
    if (!isPropertyContact && isEmpty(formData.reason)) {
      newErrors.reason = "Seleccioná un motivo";
    }

    // Teléfono (opcional)
    if (phone && phone.length < 6) {
      newErrors.phone = "Teléfono inválido";
    }

    return newErrors;
  };

  // Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    const payload = {
      ...formData,
      propertyId: property?.id || null,
      propertyReference: property?.reference || null,
      phone: formData.phone || null,
      reason: reason,
    };

    console.log("Mensaje a enviar:", payload);

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);

      setTimeout(() => setSuccess(false), 5000);

      // reset form (mantiene mensaje default si hay property)
      setFormData({
        name: "",
        email: "",
        phone: "",
        reason: "",
        message: getDefaultMessage(),
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
