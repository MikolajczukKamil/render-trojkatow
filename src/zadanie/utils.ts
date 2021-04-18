import { Color } from './Objects'

export type Bitmap = Color[][]

/**
 * Macierz width x height wypełniona kolorami
 */
export function Bitmapa(width: number, height: number): Bitmap {
  const matrix = Array<Color[]>(height)

  for (let i = 0; i < height; i++) {
    matrix[i] = Array<Color>(width)

    for (let j = 0; j < width; j++) {
      matrix[i][j] = new Color()
    }
  }

  return matrix
}

/**
 * Zamiana stopni na radiany
 */
export function stToRad(st: number): number {
  return (st * Math.PI) / 180
}
