import { Circuit, Reactor } from "opendss-node-interface";
import { Substation } from ".";

export interface SubstationInterface {
  name: string;
  reference?: boolean;
  phases?: number;
  voltage?: number;
  Isc1?: number;
  Isc3?: number;
  x0r0?: number;
  x1r1?: number;
  frequency?: number;
  resistance?: number;
}

export class MainSubstation extends Substation {
  _type = "MainSubstation";

  constructor(
    nameOrOptions: string | SubstationInterface,
    options?: Omit<SubstationInterface, "name">
  ) {
    super(nameOrOptions, options);
  }

  create() {
    const vSource = new Circuit(this.name, {
      bus1: `B_${this.name}`,
      phases: this.phases,
      basekv: this.voltage,
      Isc1: this.Isc1,
      Isc3: this.Isc3,
      x0r0: this.x0r0,
      x1r1: this.x1r1,
      pu: 1.0,
    });
    const reactor = new Reactor(`${this.name}_RT`, {
      bus1: `B_${this.name}.4`,
      bus2: `B_${this.name}.0`,
      phases: 1,
      R: this.resistance,
      X: 0,
    });
    return [vSource, reactor];
  }
}
