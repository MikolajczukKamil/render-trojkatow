import { Matrix4, Vector3, Camera } from './Objects'

export interface Projection {
  readonly code: string
  readonly name: string

  /**
   * transformation matrix
   */
  transformation(camera: Camera): Matrix4

  /**
   * transformation vektor
   */
  directionVector(position: Vector3, camera: Camera): Vector3
}
