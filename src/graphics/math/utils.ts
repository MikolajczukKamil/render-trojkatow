/**
 * Zamiana stopni na radiany
 */
export function stToRad(st: number): number {
  return (st * Math.PI) / 180
}

/**
 * Zamiana radianów na stopnie
 */
export function radToStr(rad: number): number {
  return (rad / Math.PI) * 180
}
