// import { isEmpty, isPositiveNumber } from "../utils/validation";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const usePropertyForm = (initialData) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : type === "number"
            ? value === ""
              ? ""
              : Number(value)
            : value,
    }));

    // limpiar error en tiempo real
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.title || formData.title.trim().length < 5) {
      newErrors.title = "El título debe tener al menos 5 caracteres";
    }

    if (!formData.description || formData.description.trim().length < 10) {
      newErrors.description = "Descripción muy corta";
    }

    if (!formData.city) {
      newErrors.city = "La ciudad es obligatoria";
    }

    if (!formData.price || formData.price <= 0) {
      newErrors.price = "El precio debe ser mayor a 0";
    }

    if (!formData.rooms || formData.rooms < 1) {
      newErrors.rooms = "Debe tener al menos 1 ambiente";
    }

    if (!formData.square_meters || formData.square_meters <= 0) {
      newErrors.square_meters = "Superficie inválida";
    }

    if (!formData.operation_type) {
      newErrors.operation_type = "Seleccioná un tipo";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    // if (isEdit) {
    //   console.log("EDITAR", formData);
    // } else {
    //   console.log("CREAR", formData);
    // }

    navigate("/admin/properties", { replace: true });
  };

  return {
    formData,
    errors,
    handleChange,
    handleSubmit,
  };
};

export default usePropertyForm;
