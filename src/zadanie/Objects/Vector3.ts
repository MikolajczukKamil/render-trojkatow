export type Vector3Index = 0 | 1 | 2
export type Vector3AsArray = [number, number, number]

export class Vector3 {
  constructor(public x: number, public y: number, public z: number) {}

  set(index: Vector3Index, value: number): Vector3 {
    if (index === 0) this.x = value
    else if (index === 1) this.y = value
    else this.z = value

    return this
  }

  scalar(scale: number): Vector3 {
    this.x *= scale
    this.y *= scale
    this.z *= scale

    return this
  }

  clone() {
    return new Vector3(this.x, this.y, this.z)
  }

  toArray(): Vector3AsArray {
    return [this.x, this.y, this.z]
  }

  toString(): string {
    return `[${this.x}, ${this.y}, ${this.z}]`
  }
}
