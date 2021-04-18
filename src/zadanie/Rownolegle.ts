import { Matrix4 } from './Objects/Matrix4'

/**
 * Macierz transformacji równoległej
 */
export function Rownolegle(): Matrix4 {
  return new Matrix4([
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 1,
  ])
}
