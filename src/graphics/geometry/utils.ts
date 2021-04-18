import { Color } from './Color'

export type Bitmap = Color[][]

export function generateBitmap(width: number, height: number): Bitmap {
  const matrix = Array<Color[]>(height)

  for (let i = 0; i < height; i++) {
    matrix[i] = Array<Color>(width)

    for (let j = 0; j < width; j++) {
      matrix[i][j] = new Color()
    }
  }

  return matrix
}
