import { Vector3Like } from './Vector3'

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
  ) { }

  static of(p1: Vector3Like, p2: Vector3Like, p3: Vector3Like): Plane {
    return new Plane(
      det3(
        p1.y, p1.z, 1,
        p2.y, p2.z, 1,
        p3.y, p3.z, 1,
      ),
      -det3(
        p1.x, p1.z, 1,
        p2.x, p2.z, 1,
        p3.x, p3.z, 1,
      ),
      det3(
        p1.x, p1.y, 1,
        p2.x, p2.y, 1,
        p3.x, p3.y, 1,
      ),
      -det3(
        p1.x, p1.y, p1.z,
        p2.x, p2.y, p2.z,
        p3.x, p3.y, p3.z,
      )
    )
  }

  /**
   * The square of the distance
   * @param v Position vector
   * @param d Directional vector
   */
  distanceTo2(v: Vector3Like, d: Vector3Like) {
    const ro =
      (this.A * v.x + this.B * v.y + this.C * v.z + this.D) /
      (this.A * d.x + this.B * d.y + this.C * d.z)

    return (d.x * ro) ** 2 + (d.y * ro) ** 2 + (d.z * ro) ** 2
  }
}
