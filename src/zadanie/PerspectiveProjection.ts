import { Vector3 } from './Objects'
import { Camera } from './Objects/Camera'
import { Matrix4 } from './Objects/Matrix4'
import { Projection } from './Projection'

export class PerspectiveProjection implements Projection {
  readonly name = 'Perspektywiczne'
  readonly code = '__perspective_projection__'

  private directionV = new Vector3(0, 0, 0)

  /**
   * Macierz transformacji perspektywicznej
   */
  transformation(camera: Camera): Matrix4 {
    return new Matrix4([
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1,
    ])
    .set(camera.axis, camera.axis, 0)
    .set(camera.axis, 3, -1 / camera.f)
  }

  /**
   * Odwraca kierunek dla innych osi i ustawia oś na 1
   */
  directionVector(position: Vector3, camera: Camera): Vector3 {
    this.directionV.x = -position.x
    this.directionV.y = -position.y
    this.directionV.z = -position.z

    return this.directionV.set(camera.axis, 1)
  }
}