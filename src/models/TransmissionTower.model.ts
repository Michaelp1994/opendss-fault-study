import { TowerGeometry } from "./TowerGeometry.model";

export interface TransmissionTowerInterface {
  name: string;
  resistance: number;
  distance: number;
  geometry: TowerGeometry;
}

export class TransmissionTower {
  id: number;
  name: string;
  resistance: number;
  distance: number;
  geometry: TowerGeometry;

  constructor(
    nameOrOptions: string | TransmissionTowerInterface,
    options?: Omit<TransmissionTowerInterface, "name">
  ) {
    if (typeof nameOrOptions === "string") {
      this.name = nameOrOptions;
      Object.assign(this, options);
    } else {
      Object.assign(this, nameOrOptions);
    }
  }
}
