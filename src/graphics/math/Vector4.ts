import { Matrix4 } from './Matrix4'
import { Vector3AsArray, Vector3Like } from './Vector3'

export class Vector4 implements Vector3Like {
  x: number
  y: number
  z: number
  w: number

  constructor(x: number, y: number, z: number, w: number) {
    this.x = x / w
    this.y = y / w
    this.z = z / w
    this.w = w / w
  }

  /**
   * w = 1, homogeneous coordinates
   */
  static of(x: number, y: number, z: number, w = 1): Vector4 {
    return new Vector4(x, y, z, w)
  }

  transform(M: Matrix4): Vector4 {
    const x = this.x
    const y = this.y
    const z = this.z
    const w = this.w
    const e = M.elements

    return new Vector4(
      e[0]  * x + e[1]  * y + e[2]  * z + e[3]  * w,
      e[4]  * x + e[5]  * y + e[6]  * z + e[7]  * w,
      e[8]  * x + e[9]  * y + e[10] * z + e[11] * w,
      e[12] * x + e[13] * y + e[14] * z + e[15] * w
    )
  }

  asVector3Array(): Vector3AsArray {
    return [this.x, this.y, this.z]
  }

  toString(): string {
    return `[${this.x}, ${this.y}, ${this.z}, ${this.w}]`
  }
}
