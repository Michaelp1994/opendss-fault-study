export interface CurrentSourceInterface {
  name: string;
  phases?: number;
  current?: number;
  resistance?: number;
}

export class CurrentSource {
  id: number;
  name: string;
  phases: number;
  current: number;
  resistance: number;

  constructor(
    nameOrOptions: string | CurrentSourceInterface,
    options?: Omit<CurrentSourceInterface, "name">
  ) {
    if (typeof nameOrOptions === "string") {
      this.name = nameOrOptions;
      Object.assign(this, options);
    } else {
      Object.assign(this, nameOrOptions);
    }
  }
}
