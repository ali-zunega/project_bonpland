import fs from "fs";
import path from "path";
import { generateReferenceCode } from "../src/utils/referenceCode.js";

const filePath = path.resolve("./src/data/properties.json");

// leer archivo
const rawData = fs.readFileSync(filePath);
const properties = JSON.parse(rawData);

// generar códigos
const updatedProperties = properties.map((prop) => ({
  ...prop,
  reference_code: prop.reference_code || generateReferenceCode(prop.type),
}));

// guardar archivo
fs.writeFileSync(filePath, JSON.stringify(updatedProperties, null, 2));

console.log("Reference codes generated!");
