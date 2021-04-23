import { Matrix4 } from '../math'

export enum Axis {
  x = 0,
  y = 1,
  z = 2,
}

export class Camera {
  readonly position = new Matrix4([
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1,
  ])

  readonly verticalAxis: Axis
  readonly horizontalAxis: Axis

  /* Dana z zadania */
  readonly viewportDistance = 10

  /**
   * @param f focal
   * @param axis viewport
   */
  constructor(public f: number, public axis: Axis) {
    this.position.set(3, axis, -(this.viewportDistance - f))

    this.verticalAxis = axis === Axis.z ? Axis.y : Axis.z
    this.horizontalAxis = axis === Axis.x ? Axis.y : Axis.x

    /* Kierunek osi monitora jest przeciwny do współrzędnych matematycznych */
    this.position.set(this.verticalAxis, this.verticalAxis, -1)
    this.position.set(this.horizontalAxis, this.horizontalAxis, -1)
  }
}
