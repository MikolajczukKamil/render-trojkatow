export type Vector3Index = 0 | 1 | 2
export type Vector3AsArray = [number, number, number]

/** Has x, y, z */
export interface Vector3Like {
  x: number
  y: number
  z: number
}

export class Vector3 implements Vector3Like {
  constructor(public x: number, public y: number, public z: number) {}

  set(index: Vector3Index, value: number): Vector3 {
    if (index === 0) this.x = value
    else if (index === 1) this.y = value
    else this.z = value

    return this
  }

  toString(): string {
    return `[${this.x}, ${this.y}, ${this.z}]`
  }
}
