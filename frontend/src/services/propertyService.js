import propertiesData from "../data/properties.json";
import citiesData from "../data/cities.json";
import countriesData from "../data/countries.json";
import { mapFiltersToQuery } from "../utils/mapFiltersToQuery";

// simulamos delay
const simulateDelay = (ms = 500) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// mapeamos ciudadaes y paises
const citiesMap = Object.fromEntries(citiesData.map((c) => [c.id, c]));
const countriesMap = Object.fromEntries(countriesData.map((c) => [c.id, c]));

//  ENRIQUECEDOR CENTRALIZADO
const enrichProperties = (properties) => {
  return properties.map((property) => {
    const city = citiesMap[property.city_id];
    const country = city ? countriesMap[city.country_id] : null;

    return {
      ...property,
      city,
      country,
      cityName: city?.name || "Sin ciudad",
      countryName: country?.name || "Sin país",
    };
  });
};

//  SERVICE
export const propertyService = {
  //  BÚSQUEDA CON FILTROS
  async fetchProperties(filters = {}) {
    const query = mapFiltersToQuery(filters);
    // console.log("Query de búsqueda:", query);

    await simulateDelay();

    let results = [...propertiesData];

    // FILTRO POR CIUDAD
    if (query.city_id != null) {
      results = results.filter((p) => p.city_id === Number(query.city_id));
    }

    // FILTRO POR PAÍS (vía ciudad)
    if (query.country_id != null) {
      results = results.filter((p) => {
        const city = citiesMap[p.city_id];
        return city?.country_id === Number(query.country_id);
      });
    }

    // ROOMS
    if (query.rooms != null) {
      results = results.filter((p) =>
        query.rooms === 4 ? p.rooms >= 4 : p.rooms === query.rooms,
      );
    }

    // SUPERFICIE
    if (query.min_sqm != null) {
      results = results.filter((p) => p.square_meters >= query.min_sqm);
    }

    if (query.max_sqm != null) {
      results = results.filter((p) => p.square_meters <= query.max_sqm);
    }

    // TIPO DE OPERACIÓN
    if (query.operation_type) {
      results = results.filter(
        (p) => p.operation_type === query.operation_type,
      );
    }

    // PRECIO
    if (query.min_price != null) {
      results = results.filter((p) => p.price >= query.min_price);
    }

    if (query.max_price != null) {
      results = results.filter((p) => p.price <= query.max_price);
    }

    //  ENRIQUECEMOS ANTES DE PAGINAR
    const enriched = enrichProperties(results);

    // PAGINACIÓN
    const page = query.page || 1;
    const limit = query.limit || 10;

    const start = (page - 1) * limit;
    const end = start + limit;

    return {
      success: true,
      data: enriched.slice(start, end),
      total: enriched.length,
      page,
      totalPages: Math.ceil(enriched.length / limit),
    };
  },

  //  FEATURED PROPERTIES
  async getFeaturedProperties() {
    await simulateDelay();

    const filtered = propertiesData.filter((p) => p.featured === true);

    const enriched = enrichProperties(filtered);

    return {
      success: true,
      data: enriched,
    };
  },

  //  PROPERTY BY ID
  async getPropertyById(id) {
    await simulateDelay();

    const property = propertiesData.find((p) => p.id === Number(id));

    if (!property) {
      return {
        success: false,
        data: null,
      };
    }

    // enriquecemos (reutilizamos lógica)
    const enriched = enrichProperties([property])[0];

    // adaptamos al formato backend
    const adapted = {
      id: enriched.id,
      title: enriched.title,
      description: enriched.description,
      rooms: enriched.rooms,
      square_meters: enriched.square_meters,
      price: enriched.price,
      operation_type: enriched.operation_type,
      status: enriched.status,
      type: enriched.type,
      address: enriched.address,
      city: enriched.city?.name || "Sin ciudad",
      country: enriched.country?.name || "Sin país",
      reference_code: enriched.reference_code,
      images: enriched.images || [],
      created_at: enriched.created_at,
      updated_at: enriched.updated_at,
    };

    return {
      success: true,
      data: adapted,
    };
  },
};
