import { Matrix4 } from '../math'

export enum Axis {
  x = 0,
  y = 1,
  z = 2,
}

export class Camera {
  readonly position = new Matrix4([
    -1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1,
  ])

  readonly verticalAxis: Axis
  readonly horizontalAxis: Axis

  /**
   * @param f focal
   * @param axis viewport
   */
  constructor(public f: number, public axis: Axis) {
    this.position.set(3, axis, -10)

    this.verticalAxis = axis === Axis.z ? Axis.y : Axis.z
    this.horizontalAxis = axis === Axis.x ? Axis.y : Axis.x
  }
}
