import { LineSpacing } from "opendss-node-interface";
import BaseFaultStudyComponent from "./BaseFaultStudyComponent.model";

export interface ConductorLocationInterface {
  x: number;
  y: number;
}

interface TowerGeometryInterface {
  name: string;
  phases?: number;
  conductors?: ConductorLocationInterface[];
}

export class TowerGeometry
  extends BaseFaultStudyComponent
  implements TowerGeometryInterface
{
  _type = "TowerGeometry" as const;
  id: number;
  name: string;
  phases: number;
  conductors: ConductorLocationInterface[];

  constructor(
    nameOrOptions: string | TowerGeometryInterface,
    options?: Omit<TowerGeometryInterface, "name">
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
    const spacing = new LineSpacing(this.name, {
      nConds: this.conductors.length,
      nPhases: this.conductors.length,
      x: this.conductors.map((conductor) => conductor.x),
      h: this.conductors.map((conductor) => conductor.y),
      units: "m",
    });
    return spacing;
  }
}
