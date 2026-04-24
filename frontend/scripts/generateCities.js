import fs from "fs";
import path from "path";

// rutas
const propertiesPath = path.resolve("src/data/properties.json");
const countriesPath = path.resolve("src/data/countries.json");
const outputPath = path.resolve("src/data/cities.json");

// leer archivos
const properties = JSON.parse(fs.readFileSync(propertiesPath, "utf-8"));
const countries = JSON.parse(fs.readFileSync(countriesPath, "utf-8"));

// helper para normalizar
const normalize = (str) => str?.toString().trim().toLowerCase();

// map país → id
const countryMap = {};
countries.forEach((c) => {
  countryMap[normalize(c.name)] = c.id;
});

// usar Set para evitar duplicados (city + country)
const citiesSet = new Set();

properties.forEach((prop) => {
  if (prop.city && prop.country) {
    const key = `${normalize(prop.city)}|${normalize(prop.country)}`;
    citiesSet.add(key);
  }
});

// generar cities
const cities = Array.from(citiesSet).map((item, index) => {
  const [city, country] = item.split("|");
  if (!countryMap[country]) {
    console.warn(`⚠️ País no encontrado para ciudad: ${city}`);
  }

  return {
    id: index + 1,
    name: city,
    country_id: countryMap[country] || null,
  };
});

// guardar
fs.writeFileSync(outputPath, JSON.stringify(cities, null, 2));

console.log("✅ cities.json generado correctamente");
