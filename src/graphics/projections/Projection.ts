import { Matrix4, Vector3 } from '../math'
import { Camera } from '../geometry'

export interface Projection {
  readonly name: string

  /**
   * transformation matrix
   */
  transformation(camera: Camera): Matrix4

  /**
   * transformation vector
   */
  directionVector(position: Vector3, camera: Camera): Vector3
}
