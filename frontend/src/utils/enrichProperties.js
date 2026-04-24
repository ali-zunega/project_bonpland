export const enrichProperties = (properties, citiesMap, countriesMap) => {
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
