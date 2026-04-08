/**
 * Valida si un email tiene un formato correcto
 * @param {string} email
 * @returns {boolean}
 */
export const isValidEmail = (email) => {
  if (!email) return false;

  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

/**
 * Valida si un campo está vacío
 * @param {string} value
 * @returns {boolean}
 */
export const isEmpty = (value) => {
  return !value || value.trim() === "";
};

/**
 * Valida si un numero es > 0 para price
 * @param {number} value
 * @returns {boolean}
 */
export const isPositiveNumber = (value) => {
  return !isNaN(value) && Number(value) > 0;
};
