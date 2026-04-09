import { FIELD_LIMITS, VALIDATION_RULES } from "./constants";
/**
 * Valida si un campo está vacío o solo contiene espacios.
 * @param {any} value - El valor a evaluar.
 * @returns {boolean} True si está vacío, False si tiene contenido.
 */
export const isEmpty = (value) => {
  return !value || String(value).trim() === "";
};

/**
 * Valida si el username cumple con los límites (VARCHAR 130).
 * @param {string} username
 * @returns {boolean}
 */
export const isValidUsername = (username) => {
  if (isEmpty(username)) return false;
  const trimmed = username.trim();
  return trimmed.length <= FIELD_LIMITS.USERNAME;
};

/**
 * Valida el código de referencia (5-50 caracteres, mayúsculas, números y guiones).
 * @param {string} code
 * @returns {boolean}
 */
export const isValidReferenceCode = (code) => {
  if (isEmpty(code)) return false;
  return VALIDATION_RULES.CODE_REGEX.test(code.trim().toUpperCase());
};

/**
 * Valida formato de email y longitud máxima (VARCHAR 150).
 * @param {string} email
 * @returns {boolean}
 */
export const isValidEmail = (email) => {
  if (isEmpty(email)) return false;
  const trimmed = email.trim();

  if (trimmed.length > FIELD_LIMITS.EMAIL) return false;

  return VALIDATION_RULES.EMAIL_REGEX.test(trimmed);
};

/**
 * Valida rango de precio (Máximo 1,000,000 según regla BAND).
 * @param {number|string} price - El precio a validar.
 * @returns {boolean}
 */
export const isPriceInRange = (price) => {
  if (isEmpty(price)) return false;

  const val = Number(price);

  return Number.isFinite(val) && val > 0 && val <= VALIDATION_RULES.PRICE_MAX;
};

/**
 * Valida la URL (VARCHAR 500) o ruta local de una imagen.
 * @param {string} path
 * @returns {boolean}
 */
export const isValidImagePath = (path) => {
  if (isEmpty(path)) return false;

  const trimmed = path.trim();

  if (trimmed.length > FIELD_LIMITS.IMAGE_URL) return false;

  const isLocalPath = trimmed.startsWith("/");
  const isRemoteURL = VALIDATION_RULES.URL_REGEX.test(trimmed);

  return isLocalPath || isRemoteURL;
};

/**
 * Valida la cantidad total de caracteres del mensaje
 * @param {string} message
 * @returns {boolean}
 */
export const isValidContactMessage = (message) => {
  if (isEmpty(message)) return false;

  const trimmed = message.trim();

  return trimmed.length >= 10 && trimmed.length <= FIELD_LIMITS.CONTACT_MESSAGE;
};
