import {Vector4AsArray} from './Vector4'

export class Color {
  static defaultR = 0
  static defaultG = 0
  static defaultB = 0
  static defaultA = 0

  static random(): Color {
    return new Color(
      Math.floor(Math.random() * 255),
      Math.floor(Math.random() * 255),
      Math.floor(Math.random() * 255),
      255
    )
  }

  constructor(
    public r = Color.defaultR,
    public g = Color.defaultG,
    public b = Color.defaultB,
    public a = Color.defaultA,
    public buf = Infinity
  ) {
  }

  toArray(): Vector4AsArray {
    return [this.r, this.g, this.b, this.a]
  }

  copyFrom(other: Color): void {
    this.r = other.r
    this.g = other.g
    this.b = other.b
    this.a = other.a
  }

  copy(): Color {
    return new Color(this.r, this.g, this.b, this.a)
  }

  toRGBArray(): string[] {
    return [this.r, this.g, this.b].map((v) => v.toString(16).padStart(2, '0'))
  }
}
