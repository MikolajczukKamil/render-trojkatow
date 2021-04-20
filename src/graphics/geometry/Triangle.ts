import { Color } from './Color'
import { Axis, Camera } from './Camera'
import { Vector3AsArray, Vector4, Matrix4, Plane, Vector3Like } from '../math'

export class Triangle {
  static of(
    p1: Vector3AsArray,
    p2: Vector3AsArray,
    p3: Vector3AsArray,
    color = Color.random()
  ): Triangle {
    return new Triangle(
      Vector4.of(...p1, 1),
      Vector4.of(...p2, 1),
      Vector4.of(...p3, 1),
      color
    )
  }

  constructor(
    public p1: Vector4,
    public p2: Vector4,
    public p3: Vector4,
    public color: Color
  ) {}

  /**
   * T( M * T.P1,2,3 )
   */
  transform(M: Matrix4): Triangle {
    return new Triangle(
      this.p1.transform(M),
      this.p2.transform(M),
      this.p3.transform(M),
      this.color
    )
  }

  /**
   * Calculate extra properties eg plane
   */
  compile(camera: Camera): TriangleCompiled {
    return new TriangleCompiled(this, camera)
  }

  toString() {
    return [this.p1.toString(), this.p2.toString(), this.p3.toString()].join(
      '\n'
    )
  }
}

export class TriangleCompiled {
  readonly color: Color
  readonly plane: Plane

  /* testInside2d config */
  private readonly A: Vector3AsArray
  private readonly B: Vector3AsArray
  private readonly C: Vector3AsArray
  private readonly WL: Vector3AsArray

  constructor(public readonly triangle: Triangle, private camera: Camera) {
    this.color = triangle.color
    this.plane = Plane.of(triangle.p1, triangle.p2, triangle.p3)

    const { p1, p2, p3 } = triangle

    /* testInside2d config */

    /**
     * Od tego na którą płaszczyznę rzutujemy zależy które kierunki który będziemy brać
     */

    const x =
      camera.axis === Axis.x
        ? ([p1.y, p2.y, p3.y] as const)
        : ([p1.x, p2.x, p3.x] as const)
    const y =
      camera.axis === Axis.z
        ? ([p1.y, p2.y, p3.y] as const)
        : ([p1.z, p2.z, p3.z] as const)

    this.A = [y[2] - y[1], y[2] - y[0], y[0] - y[1]]
    this.B = [x[1] - x[2], x[0] - x[2], x[1] - x[0]]
    this.C = [
      y[1] * (x[2] - x[1]) - x[1] * (y[2] - y[1]),
      y[0] * (x[2] - x[0]) - x[0] * (y[2] - y[0]),
      y[1] * (x[0] - x[1]) - x[1] * (y[0] - y[1]),
    ]

    this.WL = [
      Math.sign(this.A[0] * x[0] + this.B[0] * y[0] + this.C[0]),
      Math.sign(this.A[1] * x[1] + this.B[1] * y[1] + this.C[1]),
      Math.sign(this.A[2] * x[2] + this.B[2] * y[2] + this.C[2]),
    ]
  }

  /**
   * @param v using only of x, y
   */
  testInside2d(v: Vector3Like): boolean {
    const x = this.camera.axis === Axis.x ? v.y : v.x
    const y = this.camera.axis === Axis.z ? v.y : v.z

    return (
      this.WL[0] * (this.A[0] * x + this.B[0] * y + this.C[0]) >= 0 &&
      this.WL[1] * (this.A[1] * x + this.B[1] * y + this.C[1]) >= 0 &&
      this.WL[2] * (this.A[2] * x + this.B[2] * y + this.C[2]) >= 0
    )
  }

  toString() {
    return this.triangle.toString()
  }
}
