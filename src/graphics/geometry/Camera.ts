export enum Axis {
  x = 0,
  y = 1,
  z = 2,
}

export class Camera {
  /**
   * @param f focal
   * @param axis viewport
   */
  constructor(public f: number, public axis = Axis.z) {}
}
