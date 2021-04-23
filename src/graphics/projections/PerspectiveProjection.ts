import { Vector3, Matrix4, Vector3Like } from '../math'
import { Camera } from '../geometry'
import { Projection } from './Projection'

export class PerspectiveProjection implements Projection {
  readonly name = 'Perspektywiczne'

  private directionV = new Vector3(0, 0, 0)

  /**
   * Perspective transformation matrix
   */
  transformation(camera: Camera): Matrix4 {
    return new Matrix4([
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 0,
    ])
    .set(camera.axis, 3, 1 / camera.f)
    // .set(camera.axis, camera.axis, 0)
    // .set(camera.axis, 3, -1 / camera.f)
  }

  /**
   * Reverses the direction and for the axis sets f
   */
  directionVector(position: Vector3Like, camera: Camera): Vector3 {
    this.directionV.x = position.x
    this.directionV.y = position.y
    this.directionV.z = position.z

    return this.directionV.set(camera.axis, camera.f)
  }
}
