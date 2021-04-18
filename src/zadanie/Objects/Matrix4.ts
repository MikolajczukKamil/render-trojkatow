export type Matrix4Index = 0 | 1 | 2 | 3

export type Matrix4AsArray = [
  number, number, number, number, 
  number, number, number, number, 
  number, number, number, number, 
  number, number, number, number,
]

export class Matrix4 {
	constructor(public elements: Matrix4AsArray) {  }

  static I(): Matrix4 {
    return new Matrix4([
      1, 0, 0, 0,
			0, 1, 0, 0,
			0, 0, 1, 0,
			0, 0, 0, 1,
    ])
  }

  static zero(): Matrix4 {
    return new Matrix4([
      0, 0, 0, 0,
			0, 0, 0, 0,
			0, 0, 0, 0,
			0, 0, 0, 0,
    ])
  }

  set(x: Matrix4Index, y: Matrix4Index, value: number): Matrix4 {
    this.elements[y * 4 + x] = value

    return this
  }

	clone() {
		return new Matrix4([...this.elements])
	}

	multiplyScalar(s: number) {
		const te = this.elements

		te[0] *= s; te[4] *= s; te[8] *= s; te[12] *= s
		te[1] *= s; te[5] *= s; te[9] *= s; te[13] *= s
		te[2] *= s; te[6] *= s; te[10] *= s; te[14] *= s
		te[3] *= s; te[7] *= s; te[11] *= s; te[15] *= s

		return this
	}
}
