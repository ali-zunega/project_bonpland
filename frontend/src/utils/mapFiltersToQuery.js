export const mapFiltersToQuery = (filters) => {
  const query = {
    page: filters.page || 1,
    limit: filters.limit || 9,
    status: "available",
    published: true,
  };

  if (filters.rooms) {
    query.rooms = Number(filters.rooms);
  }
  if (filters.minSqM) {
    query.min_sqm = Number(filters.minSqM);
  }

  if (filters.maxSqM) {
    query.max_sqm = Number(filters.maxSqM);
  }

  if (filters.operation_type) {
    query.operation_type = filters.operation_type;
  }

  if (filters.minPrice) {
    query.min_price = Number(filters.minPrice);
  }

  if (filters.maxPrice) {
    query.max_price = Number(filters.maxPrice);
  }

  // temporales (hasta tener IDs reales)
  if (filters.cityId) {
    query.city_id = Number(filters.cityId);
  }

  if (filters.countryId) {
    query.country_id = Number(filters.countryId);
  }

  return Object.fromEntries(
    Object.entries(query).filter(([, value]) => value !== "" && value !== null),
  );
};
