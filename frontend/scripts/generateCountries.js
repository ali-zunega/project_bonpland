import fs from "fs";
import path from "path";

// rutas
const propertiesPath = path.resolve("src/data/properties.json");
const outputPath = path.resolve("src/data/countries.json");

// leer propiedades
const properties = JSON.parse(fs.readFileSync(propertiesPath, "utf-8"));

// usar Set para evitar duplicados
const countriesSet = new Set();

properties.forEach((prop) => {
  if (prop.country) {
    countriesSet.add(prop.country.trim());
  }
});

// convertir a array con id
const countries = Array.from(countriesSet).map((country, index) => ({
  id: index + 1,
  name: country,
}));

// guardar archivo
fs.writeFileSync(outputPath, JSON.stringify(countries, null, 2));

console.log("✅ countries.json generado correctamente");
