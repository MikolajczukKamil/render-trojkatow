import { Matrix4, Vector3, Vector3Like } from '../math'
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
  directionVector(position: Vector3Like, camera: Camera): Vector3
}
