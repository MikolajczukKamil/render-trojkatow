import { Camera } from '../geometry'
import { Vector3, Matrix4 } from '../math'
import { Projection } from './Projection'

export class ParallelProjection implements Projection {
  readonly name = 'Równoległe'

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
    ]).set(camera.axis, camera.axis, 0)
  }

  /**
   * Odwraca ustawia oś na 1, reszta 0
   */
  directionVector(_position: Vector3, camera: Camera): Vector3 {
    this.directionV.x = 0
    this.directionV.y = 0
    this.directionV.z = 0

    return this.directionV.set(camera.axis, 1)
  }
}
