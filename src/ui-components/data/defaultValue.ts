import { Axis, Color, Triangle } from '../../graphics'
import { ParametersContextValue } from '../Parameters'
import { perspectiveProjection, SIZES } from './availableValues'

export const defaultValue: ParametersContextValue = {
  updateTriangleSchema: () => {},
  addTriangleSchema: () => {},
  projection: perspectiveProjection,
  windowSize: SIZES.find((s) => s.code === '360x360')!,
  pixelSize: 0.01,
  focal: 5,
  axis: Axis.y,
  triangles: [
    {
      id: -1,
      rotation: [0, 0, 0],
      move: [0, -10, 0],
      triangle: Triangle.of(
        [2, 0, 0],
        [-1, -2, -1],
        [-1, 2, 1],
        new Color(0, 150, 136, 255)
      ),
    },
    {
      id: -2,
      rotation: [0, 0, 0],
      move: [0, -10, 0],
      triangle: Triangle.of(
        [0, 0, -2],
        [-1, -1, 2],
        [1, 1, 2],
        new Color(255, 87, 34, 255)
      ),
    },

    // {
    //   id: -10,
    //   rotation: [30, 45, 10],
    //   move: [0.5, 0.3, 2],
    //   triangle: Triangle.of(
    //     [0, 0, 0],
    //     [1, 0, 0],
    //     [0, 1, 0],
    //     new Color(63, 80, 181, 255)
    //   ),
    // },
    // {
    //   id: -11,
    //   rotation: [-30, -45, -10],
    //   move: [0.3, 0.5, 2],
    //   triangle: Triangle.of(
    //     [0, 0, 0],
    //     [1, 0, 0],
    //     [0, 1, 0],
    //     new Color(233, 30, 99, 255)
    //   ),
    // },
  ],
}
