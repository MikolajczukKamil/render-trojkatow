import { Matrix4 } from './Objects/Matrix4'

/**
 * Macież przesunięcia
 */
export function move(x: number, y: number, z: number): Matrix4 {
  return new Matrix4([
    1, 0, 0, x,
    0, 1, 0, y,
    0, 0, 1, z,
    0, 0, 0, 1,
  ])
}
