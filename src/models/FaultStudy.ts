import { Circuit, Fault, Reactor, GeneralStudy } from "opendss-node-interface";
import BaseFaultStudyComponent from "./BaseFaultStudyComponent.model";
import { Substation, TransmissionLine } from ".";
import { SubstationInterface } from "./Substation.model";

export class FaultStudy extends GeneralStudy {
  _type = "FaultStudy";
  private higherOrderComponents: BaseFaultStudyComponent[];
  name: string;

  constructor(name: string) {
    super();
    this.higherOrderComponents = [];
    this.name = name;
  }

  addComponent(component: BaseFaultStudyComponent) {
    this.higherOrderComponents.push(component);
  }

  buildCircuit() {
    this.higherOrderComponents.forEach((component) => {
      const baseComponents = component.create();
      if (Array.isArray(baseComponents)) {
        baseComponents.forEach((baseComponent) => {
          this.add(baseComponent);
        });
      } else {
        this.add(baseComponents);
      }
      this.build();
    });
  }

  // solve() {
  //   this.study.solve();
  // }

  worstCase() {
    const fault = new Fault("short_circuit");
    this.add(fault);
    this.solve();
  }
}
