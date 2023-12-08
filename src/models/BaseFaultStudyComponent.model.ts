import { BaseElement } from "opendss-node-interface";

export default abstract class BaseFaultStudyComponent {
  _type: string;
  abstract create(): BaseElement | BaseElement[];
}
