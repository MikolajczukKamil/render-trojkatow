export enum Axis {
  x = 0,
  y = 1,
  z = 2,
}

export class Camera {
  /**
   * @param f ogniskowa
   * @param axis oś w jakiej jest ustawiona kamera
   */
  constructor(public f: number, public axis = Axis.z) {}
}
