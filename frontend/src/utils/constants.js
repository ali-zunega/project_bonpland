/**
 * Constantes basadas en el Diccionario de Datos del Proyecto
 */

// Tipos de Propiedad (según tabla Properties: department, house, land, commercial)
export const PROPERTY_TYPES = {
  DEPARTMENT: "department",
  HOUSE: "house",
  LAND: "land",
  COMMERCIAL: "commercial",
};

// Tipos de Operación (según tabla Properties: ENUM)
export const OPERATION_TYPES = {
  SALE: "sale",
  RENT: "rent",
};

// Límites de longitud de caracteres (según VARCHAR y TEXT en el PDF)
export const FIELD_LIMITS = {
  USERNAME: 130, // VARCHAR(130)
  COMPANY_NAME: 150, // VARCHAR(150)
  PROPERTY_TITLE: 255, // VARCHAR(255)
  PROPERTY_CODE: 50, // VARCHAR(50)
  IMAGE_URL: 500, // VARCHAR(500)
  CONTACT_NAME: 100, // VARCHAR(100)
  CONTACT_MESSAGE: 10000, // TEXT/INT (10000)
  EMAIL: 150,
};

// Rangos numéricos y formatos (según Validuría del PDF)
export const VALIDATION_RULES = {
  PRICE_MAX: 1000000, // BAND 1,000,000 en Properties
  SQUARE_METERS_MAX: 1000000, // BAND 1,000,000 en Properties
  CODE_REGEX: /^[A-Z0-9-]{5,50}$/,
  URL_REGEX: /^https?:\/\/.+$/,
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
};

// Estados por defecto (según tabla Properties: DEFAULT)
export const PROPERTY_DEFAULTS = {
  PUBLISHED: true, // DEFAULT en la tabla Properties
};
