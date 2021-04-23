import {
  Axis,
  Projection,
  ParallelProjection,
  PerspectiveProjection,
} from '../../graphics'

export interface Size {
  width: number
  height: number
  code: string
}

export const perspectiveProjection: Projection = new PerspectiveProjection()
export const parallelProjection: Projection = new ParallelProjection()

export const PROJECTIONS: Projection[] = [
  perspectiveProjection,
  parallelProjection,
]

export const FOCALS: number[] = [
  0.01,
  0.05,
  0.1,
  0.25,
  0.5,
  0.75,
  1,
  1.25,
  1.5,
  1.75,
  2,
  3,
  4,
  5,
  10,
  20,
  30,
  50,
  100,
]

export const PIXEL_SIZES: number[] = [
  0.001,
  0.005,
  0.01,
  0.05,
  0.1,
  0.5,
  1,
  5,
  10,
  50,
  100,
]

export const AXIS: Axis[] = [Axis.x, Axis.y, Axis.z]

export const SIZES: Size[] = [
  { width: 64, height: 64, code: '64x64' },
  { width: 128, height: 128, code: '128x128' },
  { width: 256, height: 256, code: '256x256' },
  { width: 360, height: 360, code: '360x360' },
  { width: 400, height: 400, code: '400x400' },
  { width: 512, height: 512, code: '512x512' },
  { width: 1024, height: 1024, code: '1024x1024' },
]
