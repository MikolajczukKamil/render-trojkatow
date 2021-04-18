export type Matrix4Index = 0 | 1 | 2 | 3

export type Matrix4AsArray = [
  number, number, number, number, 
  number, number, number, number, 
  number, number, number, number, 
  number, number, number, number,
]

/**
 * 4x4 Matrix
 */
export class Matrix4 {
	constructor(public elements: Matrix4AsArray) {}

  /**
   * M(x, y) = value
   */
  set(x: Matrix4Index, y: Matrix4Index, value: number): Matrix4 {
    this.elements[y * 4 + x] = value

    return this
  }
}
