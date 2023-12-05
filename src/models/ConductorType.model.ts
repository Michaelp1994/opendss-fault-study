import { WireData } from "opendss-node-interface";

interface ConductorTypeInterface {
  name: string;
  surfaceArea?: number;
  stranding?: string;
  outerDiameter?: number;
  coreDiameter?: number;
  layers?: number;
  currentCapacity?: number;
  dcResistance25?: number;
  acResistance25?: number;
  acResistance50?: number;
  acResistance75?: number;
  gmr?: number;
}

export class ConductorType {
  id: number;
  name: string;
  surfaceArea?: number;
  stranding?: string;
  outerDiameter?: number;
  coreDiameter?: number;
  layers?: number;
  currentCapacity?: number;
  dcResistance25?: number;
  acResistance25?: number;
  acResistance50?: number;
  acResistance75?: number;
  gmr?: number;

  constructor(
    nameOrOptions: string | ConductorTypeInterface,
    options?: Omit<ConductorTypeInterface, "name">
  ) {
    if (typeof nameOrOptions === "string") {
      this.name = nameOrOptions;
      Object.assign(this, options);
    } else {
      Object.assign(this, nameOrOptions);
    }
  }

  create() {
    const wireData = new WireData({
      name: this.name,
      diam: this.outerDiameter,
      radunits: "mm",
      Rac: this.acResistance75,
      Runits: "km",
      Rdc: this.dcResistance25,
      GMRac: this.gmr,
      GMRunits: "mm",
    });
    return wireData;
  }
}
