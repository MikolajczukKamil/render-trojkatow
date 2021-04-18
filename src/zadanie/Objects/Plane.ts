import { Triangle } from './Triangle'
import { Vector3 } from './Vector3'

function det3(
  a: number, b: number, c: number,
  d: number, e: number, f: number,
  g: number, h: number, i: number,
): number {
  return a * e * i - a * f * h - b * d * i + b * f * g + c * d * h - c * e * g
}

export class Plane {
  constructor(
    public A: number,
    public B: number,
    public C: number,
    public D: number
  ) {}

  static of(t: Triangle): Plane {
    return new Plane(
      det3(
        t.p1.y, t.p1.z, 1,
        t.p2.y, t.p2.z, 1,
        t.p3.y, t.p3.z, 1,
      ),
      -det3(
        t.p1.x, t.p1.z, 1,
        t.p2.x, t.p2.z, 1,
        t.p3.x, t.p3.z, 1,
      ),
      det3(
        t.p1.x, t.p1.y, 1,
        t.p2.x, t.p2.y, 1,
        t.p3.x, t.p3.y, 1,
      ),
      -det3(
        t.p1.x, t.p1.y, t.p1.z,
        t.p2.x, t.p2.y, t.p2.z,
        t.p3.x, t.p3.y, t.p3.z,
      )
    )
  }

  /**
   * The square of the distance
   * @param v Position vector
   * @param d Directional vector
   */
  distanceTo2(v: Vector3, d: Vector3) {
    const ro =
      (this.A * v.x + this.B * v.y + this.C * v.z + this.D) /
      (this.A * d.x + this.B * d.y + this.C * d.z)

    return (d.x * ro) ** 2 + (d.y * ro) ** 2 + (d.z * ro) ** 2
  }
}
