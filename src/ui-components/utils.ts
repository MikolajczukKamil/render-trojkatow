import { Bitmap } from '../graphics'

/**
 * Zamienia macierz kolorów na płaski ciąg bajtów
 * @param data For cache
 */
export function flatColors(bitmap: Bitmap, data: number[]): Uint8ClampedArray {
  const height = bitmap.length
  const width = bitmap[0].length

  for (let i = 0; i < height; i++) {
    const i4w = i * 4 * width

    for (let j = 0; j < width; j++) {
      const j4i4w = j * 4 + i4w

      data[j4i4w + 0] = bitmap[i][j].r
      data[j4i4w + 1] = bitmap[i][j].g
      data[j4i4w + 2] = bitmap[i][j].b
      data[j4i4w + 3] = bitmap[i][j].a
    }
  }

  return Uint8ClampedArray.from(data)
}
