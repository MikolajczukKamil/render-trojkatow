import { move } from './move'
import { RPYT } from './RPYT'
import { Camera } from './Objects/Camera'
import { Bitmapa, Bitmap } from './utils'
import { Triangle, TriangleCompiled, Vector3 } from './Objects'
import { Projection } from './Projection'
import { TriangleSchema } from '../ui-components/Parameters/Parameters.context'

export function Render(
  trianglesSchemas: TriangleSchema[],
  width: number,
  height: number,
  pixelSize: number,
  camera: Camera,
  projection: Projection
): Bitmap {
  const triangles: Triangle[] = trianglesSchemas.map(
    ({ triangle, move: _move, rotation }) =>
      triangle.transform(RPYT(...rotation)).transform(move(..._move))
  )

  const notTransformed: TriangleCompiled[] = triangles.map((triangle) =>
    triangle.compile(camera)
  )

  const transformed: TriangleCompiled[] = triangles.map((triangle) =>
    triangle.transform(projection.transformation(camera)).compile(camera)
  )

  // console.log({
  //   trianglesSchemas,
  //   triangles,
  //   notTransformed,
  //   transformed,
  // })

  const img = Bitmapa(width, height)
  const width2 = width / 2
  const height2 = width / 2

  /* Wektor położenia obsługiwanego piksela */
  const pxV = new Vector3(0, 0, 0)

  for (let i = 0; i < height; i++) {
    // Odwrotna oś Y!
    pxV.y = (height2 - i) * pixelSize

    for (let j = 0; j < width; j++) {
      pxV.x = (j - width2) * pixelSize

      for (let k = 0; k < transformed.length; k++) {
        const triangle = transformed[k]

        if (triangle.testInside2d(pxV)) {
          // Płaszczyzna trójkąta przed transformacją !
          const d = notTransformed[k].plane.distanceTo2(
            pxV,
            projection.directionVector(pxV, camera)
          )

          if (d < img[i][j].buf) {
            img[i][j].buf = d
            img[i][j].copyFrom(triangle.triangle.color)
          }
        }
      }
    }
  }

  return img
}
