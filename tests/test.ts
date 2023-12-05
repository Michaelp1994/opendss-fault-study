import { ehs_5_16ths, linnet } from "../examples/conductorTypes";
import { k1 } from "../examples/towerGeometries";
import { FaultStudy } from "../models/FaultStudy";
import { TransmissionLine } from "../models/TransmissionLine.model";
import { VoltageSource } from "../models/VoltageSource.model";
test("Create a Fault Study", () => {
  const faultStudy = new FaultStudy("ESO-TOY", {});

  const esoura = new VoltageSource("Esoura", {
    phases: 3,
    Isc3: 1820,
    x1r1: 2.59,
    Isc1: 1070,
    x0r0: 3.46,
    voltage: 138,
    frequency: 60,
    resistance: 2,
  });

  faultStudy.add(esoura);

  const toyota = new VoltageSource("Toyota", {
    phases: 3,
    Isc3: 1820,
    x1r1: 2.59,
    Isc1: 1070,
    x0r0: 3.46,
    voltage: 138,
    frequency: 60,
    resistance: 2,
  });
  faultStudy.add(toyota);

  faultStudy.add(k1);

  faultStudy.add(linnet);

  faultStudy.add(ehs_5_16ths);

  const line1 = new TransmissionLine("Line1", {
    phases: 8,
    numNeutrals: 2,
    defaultTowerResistance: 15,
    defaultGeometry: k1,
    fromSource: esoura,
    toSource: toyota,
    conductors: [
      {
        name: "1A",
        fromPhase: 1,
        toPhase: 1,
        bundleNumber: 1,
        type: linnet,
      },
      {
        name: "1B",
        fromPhase: 2,
        toPhase: 2,
        bundleNumber: 1,
        type: linnet,
      },
      {
        name: "1C",
        fromPhase: 3,
        toPhase: 3,
        bundleNumber: 1,
        type: linnet,
      },
      {
        name: "2A",
        fromPhase: 1,
        toPhase: 1,
        bundleNumber: 1,
        type: linnet,
      },
      {
        name: "2B",
        fromPhase: 2,
        toPhase: 2,
        bundleNumber: 1,
        type: linnet,
      },
      {
        name: "2C",
        fromPhase: 3,
        toPhase: 3,
        bundleNumber: 1,
        type: linnet,
      },
      {
        name: "N1",
        fromPhase: 4,
        toPhase: 4,
        bundleNumber: 1,
        type: ehs_5_16ths,
      },
      {
        name: "N2",
        fromPhase: 4,
        toPhase: 4,
        bundleNumber: 1,
        type: ehs_5_16ths,
      },
    ],
    towers: [
      {
        name: "Line1_T1",
        resistance: 15,
        distance: 400,
        geometry: k1,
      },
      {
        name: "Line1_T2",
        resistance: 15,
        distance: 400,
        geometry: k1,
      },
      {
        name: "Line1_T3",
        resistance: 15,
        distance: 400,
        geometry: k1,
      },
      {
        name: "Line1_T4",
        resistance: 15,
        distance: 400,
        geometry: k1,
      },
      {
        name: "Line1_T5",
        resistance: 15,
        distance: 400,
        geometry: k1,
      },
      {
        name: "Line1_T6",
        resistance: 15,
        distance: 400,
        geometry: k1,
      },
      {
        name: "Line1_T7",
        resistance: 15,
        distance: 400,
        geometry: k1,
      },
      {
        name: "Line1_T8",
        resistance: 15,
        distance: 400,
        geometry: k1,
      },
      {
        name: "Line1_T9",
        resistance: 15,
        distance: 400,
        geometry: k1,
      },
      {
        name: "Line1_T10",
        resistance: 15,
        distance: 400,
        geometry: k1,
      },
    ],
  });

  faultStudy.add(line1);
  faultStudy.build();
  faultStudy.circuit.saveScript("script.dss");
  faultStudy.circuit.solve();
});
