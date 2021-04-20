import { RefObject, useContext, useEffect, useMemo, useRef } from 'react'

import { Render } from '../Render'
import { flatColors } from './utils'
import { Bitmap, Camera, generateBitmap } from '../graphics'
import { ParametersContext } from './Parameters'

export function useImage(canvas: RefObject<HTMLCanvasElement>): void {
  const {
    axis,
    focal,
    pixelSize,
    projection,
    triangles,
    windowSize: { width, height },
  } = useContext(ParametersContext)

  //#region Cache
  const ctx = useRef<CanvasRenderingContext2D>(null)

  /** For cache */
  const bitmap: Bitmap = useMemo(() => generateBitmap(width, height), [
    width,
    height,
  ])

  /** For cache */
  const flatBitmap: number[] = useMemo(() => new Array(width * height * 4), [
    width,
    height,
  ])
  //#endregion Cache

  useEffect(() => {
    if (!canvas.current) return

    // @ts-ignore .current - readonly
    if (!ctx.current) ctx.current = canvas.current.getContext('2d')!

    const image: Bitmap = Render(
      triangles,
      width,
      height,
      pixelSize,
      new Camera(focal, axis),
      projection,
      bitmap
    )

    ctx.current.putImageData(
      new ImageData(flatColors(image, flatBitmap), width, height),
      0,
      0
    )
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triangles, axis, focal, pixelSize, projection, width, height])
}
