import {
  Vector3,
  Projection,
  translation,
  RPYRotation,
  Triangle,
  TriangleCompiled,
  Camera,
  Bitmap,
} from './graphics'
import { TriangleSchema } from './ui-components/TriangleSchema'

/**
 * @param img For cache
 */
export function Render(
  trianglesSchemas: TriangleSchema[],
  width: number,
  height: number,
  pixelSize: number,
  camera: Camera,
  projection: Projection,
  img: Bitmap,
  depthByTransparency = true
): Bitmap {
  const triangles: Triangle[] = trianglesSchemas.map(
    ({ triangle, move, rotation }) =>
      triangle
        .transform(RPYRotation(...rotation))
        .transform(translation(...move))
        .transform(camera.position)
  )

  const notTransformed: TriangleCompiled[] = triangles.map((triangle) =>
    triangle.compile(camera)
  )

  const transformed: TriangleCompiled[] = triangles.map((triangle) =>
    triangle.transform(projection.transformation(camera)).compile(camera)
  )

  const width2 = width / 2
  const height2 = width / 2

  /* Wektor położenia obsługiwanego piksela */
  const pxV = new Vector3(0, 0, 0)
  pxV.set(camera.axis, camera.viewportDistance - camera.f)

  let minDepth = 0
  let maxDepth = 0

  if (depthByTransparency) {
    const distances = transformed.flatMap((t, k) =>
      [t.triangle.p1, t.triangle.p2, t.triangle.p3].map((p) =>
        Math.sqrt(
          notTransformed[k].plane.distanceTo2(
            p,
            projection.directionVector(p, camera)
          )
        )
      )
    )

    minDepth = Math.min(...distances)
    maxDepth = Math.max(...distances)
  }

  const depthDiffrance = maxDepth - minDepth

  for (let i = 0; i < height; i++) {
    // Odwrotna oś Y!
    pxV.set(camera.verticalAxis, (height2 - i) * pixelSize)

    for (let j = 0; j < width; j++) {
      pxV.set(camera.horizontalAxis, (j - width2) * pixelSize)

      img[i][j].reset()

      for (let k = 0; k < transformed.length; k++) {
        const triangle = transformed[k]

        if (triangle.testInside2d(pxV)) {
          // Płaszczyzna trójkąta przed transformacją !
          const d2 = notTransformed[k].plane.distanceTo2(
            pxV,
            projection.directionVector(pxV, camera)
          )

          if (d2 < img[i][j].buf) {
            img[i][j].buf = d2
            img[i][j].copyFrom(triangle.color)

            if (depthByTransparency) {
              img[i][j].a = Math.round(
                ((maxDepth - Math.sqrt(d2)) / depthDiffrance) * 255
              )
            }
          }
        }
      }
    }
  }

  return img
}
