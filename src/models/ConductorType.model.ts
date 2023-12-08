import { WireData } from "opendss-node-interface";
import BaseFaultStudyComponent from "./BaseFaultStudyComponent.model";

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

export class ConductorType
  extends BaseFaultStudyComponent
  implements ConductorTypeInterface
{
  _type = "ConductorType" as const;
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
    super();
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
      radUnits: "mm",
      rac: this.acResistance75,
      rUnits: "km",
      rdc: this.dcResistance25,
      gmrac: this.gmr,
      gmrUnits: "mm",
    });
    return wireData;
  }
}
