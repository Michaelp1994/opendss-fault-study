import { ConductorType } from "./ConductorType.model";

export interface ConductorInterface {
  name: string;
  fromPhase?: number;
  toPhase?: number;
  bundleNumber?: number;
  bundleSpacing?: number;
  type?: ConductorType;
}

export class Conductor implements ConductorInterface {
  _type = "Conductor" as const;
  id: number;
  name: string;
  fromPhase: number;
  toPhase: number;
  bundleNumber: number;
  bundleSpacing?: number;
  type: ConductorType;

  constructor(
    nameOrOptions: string | ConductorInterface,
    options?: Omit<ConductorInterface, "name">
  ) {
    if (typeof nameOrOptions === "string") {
      this.name = nameOrOptions;
      Object.assign(this, options);
    } else {
      Object.assign(this, nameOrOptions);
    }
  }
}
