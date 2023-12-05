import { Circuit } from "opendss-node-interface";

export class FaultStudy {
  circuit: Circuit;
  components: Array<any>;
  constructor(name: string, options) {
    this.circuit = new Circuit(name, options);
    this.components = [];
  }

  add(component) {
    this.components.push(component);
  }

  build() {
    this.components.forEach((component) => {
      const baseComponents = component.create();
      if (Array.isArray(baseComponents)) {
        baseComponents.forEach((baseComponent) => {
          this.circuit.add(baseComponent);
        });
      } else {
        this.circuit.add(baseComponents);
      }
      this.circuit.build();
    });
  }

  // worstCase(faultLocations) {
  //   const fault = new Fault("short_circuit");
  //   this.circuit.add(fault);
  //   this.circuit.solve();

  //   //this.openDss.createFault({ name: "short_circuit" });
  //   faultLocations.forEach((faultLocation) => {
  //     // this.circuit.driver.setActiveElement("Fault.short_circuit");
  //     this.circuit.changeParameter(
  //       fault,
  //       "bus1",
  //       `${faultLocation.location}.${faultLocation.fromPhase}`
  //     );
  //     this.circuit.changeParameter(
  //       fault,
  //       "bus2",
  //       `${faultLocation.location}.${faultLocation.toPhase}`
  //     );

  //     faultLocation.measureLocations.forEach((measurePoint) => {
  //       this.openDss.setActiveElement(`Reactor.${measurePoint}`);
  //       //console.log(this.dssElem.Currents);
  //       const current = this.openDss.dssMathLib.ctopolardeg(
  //         this.openDss.dssElem.Currents[0],
  //         this.openDss.dssElem.Currents[1]
  //       )[0];
  //       console.log(`${measurePoint}: ${current}A`);
  //     });
  //   });
  // }

  // async generateAllConductors() {
  //   allConductorTypesUsed.forEach((conductor) => {
  //     this.openDss.createWiredata({
  //       name: conductor.name,
  //       diam: conductor.outerDiameter,
  //       radunits: "mm",
  //       Rac: conductor.acResistance75,
  //       Runits: "km",
  //       GMRac: conductor.gmr,
  //       GMRunits: "mm",
  //     });
  //   });
  // }

  // async generateAllLineSpacings() {
  //   allTowerGeometriesUsed.forEach((geometry) => {
  //     const x = geometry.conductors.map((location) => location.x);
  //     const h = geometry.conductors.map((location) => location.y);
  //     const nconds = geometry.conductors.length;
  //     this.openDss.createLineSpacing({
  //       name: geometry.name,
  //       nconds: nconds,
  //       nphases: nconds,
  //       units: "m",
  //       x: x,
  //       h: h,
  //     });
  //   });
  // }

  // addTransmissionTower() {
  //   const line = new Line();
  //   this.openDss.createLine({
  //     name: `${name}_S1`,
  //     bus1: `B_${transmissionLine.fromSource.name}.${initialPhases}`,
  //     bus2: tower.name,
  //     geometry: `${name}_${geometryName}`,
  //     ...defaultLineOptions,
  //   });

  //   this.openDss.createReactor({
  //     name: `${tower.name}_RT`,
  //     bus1: `${tower.name}.${neutralBus1Phases}`,
  //     bus2: `${tower.name}.${neutralBus2Phases}`,
  //     R: tower.resistance,
  //     ...defaultReactorOptions,
  //   });
  // }

  // addTransmissionLine(transmissionLine: TransmissionLine) {
  //   const spanLength = parseFloat(
  //     ((transmissionLine.distance * 1000) / transmissionLine.numTowers).toFixed(
  //       0
  //     )
  //   );
  //   const name = transmissionLine.name;
  //   const numTowers = transmissionLine.towers.length;
  //   const numPhases = transmissionLine.conductors.length;
  //   const numNeutrals = transmissionLine.numNeutrals;
  //   const fromPhases = transmissionLine.conductors.map(
  //     (transmissionLine) => transmissionLine.fromPhase
  //   );
  //   const toPhases = transmissionLine.conductors.map(
  //     (transmissionLine) => transmissionLine.toPhase
  //   );

  //   const initialPhases = fromPhases.join(".");
  //   const intermediatePhases = [...Array(numPhases).keys()].map((i) => i + 1); // array from 1 to numPhases
  //   const finalPhases = toPhases.join(".");
  //   const neutralBus1Phases = intermediatePhases.slice(-numNeutrals).join(".");
  //   const neutralBus2Phases = new Array(numNeutrals).fill(0).join(".");
  //   const wires = transmissionLine.conductors.map(
  //     (conductor) => conductor.type.name
  //   );
  //   const defaultLineOptions = {
  //     phases: transmissionLine.phases,
  //     length: spanLength,
  //     units: "m",
  //     Xg: 0,
  //     Rg: 0,
  //     rho: 100,
  //   };
  //   const defaultReactorOptions = {
  //     phases: numNeutrals,
  //     X: 0,
  //   };

  //   const geometries = transmissionLine.towers.map(
  //     (tower) => tower.geometry.id
  //   );
  //   const uniqueGeometries = [...new Set(geometries)];
  //   uniqueGeometries.forEach((geometry) => {
  //     this.circuit.add(
  //       new LineGeometry({
  //         name: `${name}_${geometry.name}`,
  //         nconds: numPhases,
  //         nphases: numPhases,
  //         spacing: geometry.name,
  //         reduce: false,
  //         wires: wires,
  //       })
  //     );
  //   });
  // }

  // addTransmissionLine(transmissionLine: TransmissionLine) {
  //   transmissionLine.towers.forEach((tower, index) => {
  //     const name = "line1_" + tower.name;
  //     const towerNumber = index + 1;
  //     if (towerNumber === 1) {
  //       const line = new Line("line1_s" + towerNumber, {
  //         bus1: transmissionLine.fromSource.name,
  //         bus2: "line1_T" + tower.name + c,
  //         phases: transmissionLine.,
  //         length: tower.distance,
  //         units: "m",
  //         geometry: "line1_K1",
  //       });
  //       const reactor = new Reactor(name + "_RT", {
  //         bus1: "line1_T" + tower.name + ".7",
  //         bus2: "line1_T" + tower.name + ".0",
  //         R: 15,
  //         X: 0,
  //         phases: 1,
  //       });
  //       this.add(line);
  //       this.add(reactor);
  //     } else {
  //       const prevName = towers[index - 1].name;
  //       const line = new Line("line1_s" + towerNumber, {
  //         bus1: "line1_T" + prevName + c,
  //         bus2: "line1_T" + tower.name + c,
  //         length: tower.distance,
  //         phases: 8,
  //         units: "m",
  //         geometry: "line1_K1",
  //       });

  //       const reactor = new Reactor(name + "_RT", {
  //         bus1: "line1_T" + tower.name + ".7",
  //         bus2: "line1_T" + tower.name + ".0",
  //         R: 15,
  //         X: 0,
  //         phases: 1,
  //       });
  //       this.add(line);
  //       this.add(reactor);
  //     }
  //   });
  // }

  // async generateTransmissionLines() {
  //   for await (const transmissionLine of transmissionLines) {
  //     uniqueGeometries.forEach((geometry) => {
  //       this.openDss.createLineGeometry({
  //         name: `${name}_${geometry.name}`,
  //         nconds: numPhases,
  //         nphases: numPhases,
  //         spacing: geometry.name,
  //         reduce: "No",
  //         wires: wires,
  //       });
  //     });
  //     // Start Here
  //     transmissionLine.towers.forEach((tower, index) => {
  //       const towerNumber = index + 1;
  //       const geometryName = tower.geometry.name;
  //       if (towerNumber === 1) {
  //         this.openDss.createLine({
  //           name: `${name}_S1`,
  //           bus1: `B_${transmissionLine.fromSource.name}.${initialPhases}`,
  //           bus2: tower.name,
  //           geometry: `${name}_${geometryName}`,
  //           ...defaultLineOptions,
  //         });

  //         this.openDss.createReactor({
  //           name: `${tower.name}_RT`,
  //           bus1: `${tower.name}.${neutralBus1Phases}`,
  //           bus2: `${tower.name}.${neutralBus2Phases}`,
  //           R: tower.resistance,
  //           ...defaultReactorOptions,
  //         });
  //       } else {
  //         const prevTower = transmissionLine.towers[index - 1].name;

  //         this.openDss.createLine({
  //           name: `${name}_S${towerNumber}`,
  //           bus1: prevTower,
  //           bus2: tower.name,
  //           geometry: `${name}_${geometryName}`,
  //           ...defaultLineOptions,
  //         });

  //         this.openDss.createReactor({
  //           name: `${tower.name}_RT`,
  //           bus1: `${tower.name}.${neutralBus1Phases}`,
  //           bus2: `${tower.name}.${neutralBus2Phases}`,
  //           R: tower.resistance,
  //           ...defaultReactorOptions,
  //         });
  //         if (towerNumber === numTowers) {
  //           this.openDss.createLine({
  //             name: `${name}_S${towerNumber + 1}`,
  //             bus1: tower.name,
  //             bus2: `B_${transmissionLine.toSource.name}.${finalPhases}`,
  //             geometry: `${name}_${geometryName}`,
  //             ...defaultLineOptions,
  //           });
  //         }
  //       }
  //     });
  //   }
  // }
}
