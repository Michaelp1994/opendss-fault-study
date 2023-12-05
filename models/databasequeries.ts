import { ConductorType } from "./ConductorType.model";
import { TowerGeometry } from "./TowerGeometry.model";
import { TransmissionLine } from "./TransmissionLine.model";
import { VoltageSource } from "./VoltageSource.model";

class Database {
  async generateVSource() {
    const vSources = await VoltageSource.find({
      where: { circuit: { id: this.circuit.id } },
    });
  }

  async generateAllConductors() {
    const allConductorTypesUsed = await ConductorType.find({
      relations: {
        conductors: {
          transmissionLine: {
            circuit: true,
          },
        },
      },
      where: {
        conductors: { transmissionLine: { circuit: { id: this.circuit.id } } },
      },
    });
    
  async generateAllLineSpacings() {
    const allTowerGeometriesUsed = await TowerGeometry.find({
      relations: {
        conductors: true,
        towers: {
          transmissionLine: {
            circuit: true,
          },
        },
      },
      where: {
        towers: { transmissionLine: { circuit: { id: this.circuit.id } } },
      },
    });

    async generateTransmissionLines() {
        const transmissionLines = await TransmissionLine.find({
          relations: {
            circuit: true,
            fromSource: true,
            toSource: true,
            conductors: {
              type: true,
            },
            towers: {
              geometry: true,
            },
          },
          order: {
            towers: {
              id: "ASC",
            },
          },
          where: {
            circuit: {
              id: this.circuit.id,
            },
          },
        });

        const uniqueGeometries = await TowerGeometry.find({
            where: {
              towers: {
                transmissionLine: {
                  circuit: {
                    id: this.circuit.id,
                  },
                },
              },
            },
          });
    }
}
