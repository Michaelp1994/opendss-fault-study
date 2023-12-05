import { LineSpacing } from "opendss-node-interface";

export interface ConductorLocationInterface {
  x: number;
  y: number;
}

interface TowerGeometryInterface {
  name: string;
  phases?: number;
  conductors?: ConductorLocationInterface[];
}

export class TowerGeometry {
  id: number;
  name: string;
  phases: number;
  conductors: ConductorLocationInterface[];

  constructor(
    nameOrOptions: string | TowerGeometryInterface,
    options?: Omit<TowerGeometryInterface, "name">
  ) {
    if (typeof nameOrOptions === "string") {
      this.name = nameOrOptions;
      Object.assign(this, options);
    } else {
      Object.assign(this, nameOrOptions);
    }
  }

  create() {
    const spacing = new LineSpacing({
      name: this.name,
      nconds: this.conductors.length,
      nphases: this.conductors.length,
      x: this.conductors.map((conductor) => conductor.x),
      h: this.conductors.map((conductor) => conductor.y),
      units: "m",
    });
    return spacing;
  }
}
