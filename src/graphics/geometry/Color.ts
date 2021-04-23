export class Color {
  static readonly transparent: Color = new Color(0, 0, 0, 0, 0)

  static random(): Color {
    return new Color(
      Math.floor(Math.random() * 255),
      Math.floor(Math.random() * 255),
      Math.floor(Math.random() * 255),
      255
    )
  }

  constructor(
    public r: number = Color.transparent.r,
    public g: number = Color.transparent.g,
    public b: number = Color.transparent.b,
    public a: number = Color.transparent.a,
    public buf: number = Infinity
  ) {}

  copyFrom(other: Color): void {
    this.r = other.r
    this.g = other.g
    this.b = other.b
    this.a = other.a
  }

  /**
   * Reset to transparent
   */
  reset(): void {
    this.copyFrom(Color.transparent)
    this.buf = Infinity
  }

  toRGBArray(): string[] {
    return [this.r, this.g, this.b].map((v) => v.toString(16).padStart(2, '0'))
  }
}
