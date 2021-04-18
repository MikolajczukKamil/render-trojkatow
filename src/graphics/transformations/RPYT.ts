import { Matrix4, stToRad } from '../math/'

/**
 * roll-pitch-yaw rotation
 *
 * @param r roll, Z axis
 * @param p pitch, Y axis, after roll
 * @param y yaw, X axis after pitch
 */
export function RPYRotation(r: number, p: number, y: number): Matrix4 {
  r = stToRad(r)
  p = stToRad(p)
  y = stToRad(y)

  const S1 = Math.sin(r)
  const C1 = Math.cos(r)
  const S2 = Math.sin(p)
  const C2 = Math.cos(p)
  const S3 = Math.sin(y)
  const C3 = Math.cos(y)

  /**
   * Do przekopiowania jak formatowanie się rozjedzie
   * 
    [
      C1 * C2,   C1 * S2 * S3 - S1 * C3,  C1 * S2 * C3 + S1 * S3,  0,
      S1 * C2,   S1 * S2 * S3 + C1 * C3,  S1 * S2 * C3 - C1 * S3,  0,
      -S2,       C2 * S3,                 C2 * C3,                 0,
      0,         0,                       0,                       1,
    ]
   */

  return new Matrix4([
    C1 * C2,   C1 * S2 * S3 - S1 * C3,  C1 * S2 * C3 + S1 * S3,  0,
    S1 * C2,   S1 * S2 * S3 + C1 * C3,  S1 * S2 * C3 - C1 * S3,  0,
    -S2,       C2 * S3,                 C2 * C3,                 0,
    0,         0,                       0,                       1,
  ])
}
