import {
  BaseElement,
  Line,
  LineGeometry,
  Reactor,
} from "opendss-node-interface";
import BaseFaultStudyComponent from "./BaseFaultStudyComponent.model";
import { Conductor, ConductorInterface } from "./Conductor.model";
import { Substation } from "./Substation.model";
import { TowerGeometry } from "./TowerGeometry.model";
import {
  TransmissionTower,
  TransmissionTowerInterface,
} from "./TransmissionTower.model";

interface TransmissionLineInterface {
  name: string;
  phases?: number;
  numNeutrals?: number;
  numTowers?: number;
  distance?: number;
  defaultTowerResistance?: number;
  defaultGeometry?: TowerGeometry;
  fromSource?: Substation;
  toSource?: Substation;
  conductors?: ConductorInterface[];
  towers?: TransmissionTowerInterface[];
}

export class TransmissionLine
  extends BaseFaultStudyComponent
  implements TransmissionLineInterface
{
  _type = "TransmissionLine" as const;
  id: number;
  name: string;
  phases: number;
  numNeutrals: number;
  numTowers?: number;
  distance?: number;
  defaultTowerResistance?: number;
  defaultGeometry: TowerGeometry;
  fromSource: Substation;
  toSource: Substation;
  conductors: Conductor[];
  towers: TransmissionTower[] = [];

  constructor(
    nameOrOptions: string | TransmissionLineInterface,
    options?: Omit<TransmissionLineInterface, "name">
  ) {
    super();
    if (typeof nameOrOptions === "string") {
      this.name = nameOrOptions;
      const optionsObj = options;
      if (options) {
        const { towers, ...otherOptions } = options;
        Object.assign(this, otherOptions);
        towers?.forEach((tower) => {
          this.towers.push(
            new TransmissionTower({
              ...tower,
            })
          );
        });
      }
    } else {
      const { towers, ...otherOptions } = nameOrOptions;
      Object.assign(this, otherOptions);
      towers?.forEach((tower) => {
        this.towers.push(
          new TransmissionTower({
            ...tower,
          })
        );
      });
    }
  }

  createTowers() {
    if (
      !this.numTowers ||
      !this.defaultTowerResistance ||
      !this.defaultGeometry ||
      !this.distance
    )
      throw Error("Please define variables first");
    const spanLength = this.distance / this.numTowers;
    for (let i = 0; i < this.numTowers; i++) {
      this.towers.push(
        new TransmissionTower(`${this.name}_T${i}`, {
          resistance: this.defaultTowerResistance,
          distance: spanLength,
          geometry: this.defaultGeometry,
        })
      );
    }
  }

  createGeometries() {
    const geometries = this.towers.map((tower) => tower.geometry);
    const uniqueGeometryNames = [
      ...new Set(geometries.map((geometry) => geometry.name)),
    ];
    const uniqueGeometries = uniqueGeometryNames.map((geometryName) =>
      geometries.find((geometry) => geometry.name === geometryName)
    );
    const components = uniqueGeometries.map((geometry) => {
      if (!geometry) throw Error("Cannot find Geometry");
      return new LineGeometry({
        name: `${this.name}_${geometry.name}`,
        nconds: this.conductors.length,
        reduce: false,
        spacing: geometry.name,
        wires: this.conductors.map((conductor) => conductor.type.name),
      });
    });
    return components;
  }

  create() {
    const components: BaseElement[] = this.createGeometries();
    const numConductors = this.conductors.length;
    const fromPhases = this.conductors.map(
      (transmissionLine) => transmissionLine.fromPhase
    );
    const toPhases = this.conductors.map(
      (transmissionLine) => transmissionLine.toPhase
    );

    const initialPhases = fromPhases.join(".");
    const intermediatePhases = [...Array(numConductors).keys()].map(
      (i) => i + 1
    ); // array from 1 to numPhases
    const finalPhases = toPhases.join(".");
    const neutralBus1Phases = intermediatePhases
      .slice(-this.numNeutrals)
      .join(".");
    const neutralBus2Phases = new Array(this.numNeutrals).fill(0).join(".");
    this.towers.forEach((tower, index) => {
      const towerNumber = index + 1;
      if (towerNumber === 1) {
        components.push(
          new Line({
            name: `${this.name}_s${index}`,
            bus1: `${this.fromSource.name}.${initialPhases}`,
            bus2: tower.name,
            phases: this.phases,
            length: tower.distance,
            units: "m",
            geometry: `${this.name}_${tower.geometry.name}`,
          })
        );
        components.push(
          new Reactor(tower.name + "_RT", {
            bus1: `${tower.name}.${neutralBus1Phases}`,
            bus2: `${tower.name}.${neutralBus2Phases}`,
            R: tower.resistance,
            X: 0,
            phases: this.numNeutrals,
          })
        );
      } else {
        const prevName = this.towers[index - 1].name;
        components.push(
          new Line(`${this.name}_s${index}`, {
            bus1: prevName,
            bus2: tower.name,
            length: tower.distance,
            phases: this.distance,
            units: "m",
            geometry: `${this.name}_${tower.geometry.name}`,
          })
        );
        components.push(
          new Reactor(`${tower.name}_RT`, {
            bus1: `${tower.name}.${neutralBus1Phases}`,
            bus2: `${tower.name}.${neutralBus2Phases}`,
            R: tower.resistance,
            X: 0,
            phases: this.numNeutrals,
          })
        );
        if (towerNumber === this.towers.length) {
          components.push(
            new Line(`${this.name}_s${index + 1}`, {
              bus1: tower.name,
              bus2: `${this.toSource.name}.${finalPhases}`,
              length: tower.distance,
              phases: this.distance,
              units: "m",
              geometry: `${this.name}_${tower.geometry.name}`,
            })
          );
        }
      }
    });
    return components;
  }
}
