import { Triangle, Vector3AsArray } from '../graphics'

export interface TriangleSchema {
  id: number
  triangle: Triangle
  move: Vector3AsArray
  rotation: Vector3AsArray
}
