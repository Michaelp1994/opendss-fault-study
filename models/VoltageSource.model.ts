import { Reactor, Vsource } from "opendss-node-interface";

interface VoltageSourceInterface {
  name: string;
  phases?: number;
  voltage?: number;
  Isc1?: number;
  Isc3?: number;
  x0r0?: number;
  x1r1?: number;
  frequency?: number;
  resistance?: number;
}

export class VoltageSource {
  private _type = "VoltageSource" as const;
  id: number;
  name: string;
  phases?: number;
  voltage?: number;
  Isc1?: number;
  Isc3?: number;
  x0r0?: number;
  x1r1?: number;
  frequency?: number;
  resistance?: number;

  constructor(
    nameOrOptions: string | VoltageSourceInterface,
    options?: Omit<VoltageSourceInterface, "name">
  ) {
    if (typeof nameOrOptions === "string") {
      this.name = nameOrOptions;
      Object.assign(this, options);
    } else {
      Object.assign(this, nameOrOptions);
    }
  }

  create() {
    const vSource = new Vsource(this.name, {
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
