import fs from "fs";
import conductors from "./conductors.json";

let file = `import { ConductorType } from "./models/ConductorType.model"\n`;
conductors.forEach((conductor) => {
  file += `export const ${conductor.name.toLowerCase()} = new ConductorType("${
    conductor.name
  }", {\n`;
  file += `surfaceArea: ${conductor.aluminium_mm2},\n`;
  file += `stranding: "${conductor.stranding}",\n`;
  file += `outerDiameter: ${conductor.diameter_conductor},\n`;
  file += `coreDiameter: ${conductor.diameter_core},\n`;
  file += `layers: ${conductor.layers},\n`;
  file += `dcResistance25: ${conductor.dc_resistance_25 / 1000},\n`;
  file += `acResistance25: ${conductor.ac_resistance_25 / 1000},\n`;
  file += `acResistance50: ${conductor.ac_resistance_50 / 1000},\n`;
  file += `acResistance75: ${conductor.ac_resistance_75 / 1000},\n`;
  file += `gmr: ${conductor.gmr}\n`;
  file += `});\n\n`;
});

fs.writeFileSync("./conductorTypes.ts", file);
