import fs from "fs";
import path from "path";
import { checkUniqueReferenceCodes } from "../src/utils/checkUniqueReferenceCodes.js";

const filePath = path.resolve("src/data/properties.json");

// 1. Leer archivo
const rawData = fs.readFileSync(filePath);
const properties = JSON.parse(rawData);
console.log(`Loaded ${properties.length} properties for validation.`);

// 2. Validar
const result = checkUniqueReferenceCodes(properties);
console.log("resultados:", result);

// 3. Resultado
if (!result.isValid) {
  console.log("❌ Duplicate reference codes found:");
  console.table(result.duplicates);
} else {
  console.log("✅ All reference codes are unique");
}
