import { Matrix4 } from '../math'

export enum Axis {
  x = 0,
  y = 1,
  z = 2,
}

export class Camera {
  readonly rotation = new Matrix4([
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1,
  ])

  readonly position = new Matrix4([
    1, 0, 0, 0,
    0, 1, 0, 10,
    0, 0, 1, 0,
    0, 0, 0, 1,
  ])

  /**
   * @param f focal
   * @param axis viewport
   */
  constructor(public f: number, public axis = Axis.z) {}
}
