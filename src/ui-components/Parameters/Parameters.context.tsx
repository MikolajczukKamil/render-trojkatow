import React, { useCallback, useState, createContext, ReactNode } from 'react'

import { Axis, Triangle, Projection } from '../../graphics'
import { PROJECTIONS, Size, SIZES } from '../data/availableValues'
import { defaultValue } from '../data/defaultValue'
import { TriangleSchema } from '../TriangleSchema'

let triangleId = 0

export interface ParametersContextValue {
  handleChangeProjection?: (code: string) => void
  handleChangeFocal?: (focal: number) => void
  handleChangePixelSize?: (pixelSize: number) => void
  handleChangeAxis?: (axis: Axis) => void
  handleChangeWindowSize?: (sizeCode: string) => void
  updateTriangleSchema: (schema: TriangleSchema) => void
  addTriangleSchema: () => void

  triangles: TriangleSchema[]
  projection: Projection
  windowSize: Size
  pixelSize: number
  focal: number
  axis: number
}

export const ParametersContext = createContext<ParametersContextValue>(
  defaultValue
)

interface ParametersContextProviderProps {
  children: ReactNode | ReactNode[]
}

function rand(min: number, max: number) {
  return Math.round((Math.random() * (max - min) + min) * 10) / 10
}

export function ParametersContextProvider({
  children,
}: ParametersContextProviderProps) {
  const [focal, setFocal] = useState<number>(defaultValue.focal)
  const [axis, setAxis] = useState<Axis>(defaultValue.axis)
  const [windowSize, setWindowSize] = useState<Size>(defaultValue.windowSize)
  const [pixelSize, setPixelSize] = useState<number>(defaultValue.pixelSize)
  const [triangles, setTriangles] = useState<TriangleSchema[]>(
    defaultValue.triangles
  )
  const [projection, setProjection] = useState<Projection>(
    defaultValue.projection
  )

  const handleChangeProjection = useCallback(
    (name: string) => setProjection(PROJECTIONS.find((p) => p.name === name)!),
    []
  )
  const handleChangeWindowSize = useCallback(
    (sizeCode: string) =>
      setWindowSize(SIZES.find((p) => p.code === sizeCode)!),
    []
  )
  const handleChangeFocal = useCallback((f: number) => setFocal(f), [])
  const handleChangePixelSize = useCallback(
    (pxSize: number) => setPixelSize(pxSize),
    []
  )
  const handleChangeAxis = useCallback((ax: Axis) => setAxis(ax), [])

  const updateTriangleSchema = useCallback(
    (schema: TriangleSchema) =>
      setTriangles((ts) => ts.map((t) => (t.id === schema.id ? schema : t))),
    []
  )

  const addTriangleSchema = useCallback(
    () =>
      setTriangles((ts) => [
        ...ts,
        {
          id: triangleId++,
          triangle: Triangle.of(
            [rand(-5, 5), rand(-5, 5), rand(-5, 5)],
            [rand(-5, 5), rand(-5, 5), rand(-5, 5)],
            [rand(-5, 5), rand(-5, 5), rand(-5, 5)]
          ),
          move: [rand(-5, 5), rand(-5, 5), rand(-5, 5)],
          rotation: [rand(0, 360), rand(0, 360), rand(0, 360)],
        },
      ]),
    []
  )

  return (
    <ParametersContext.Provider
      value={{
        handleChangeProjection,
        handleChangeFocal,
        handleChangePixelSize,
        handleChangeAxis,
        handleChangeWindowSize,
        updateTriangleSchema,
        addTriangleSchema,

        triangles,
        projection,
        windowSize,
        pixelSize,
        focal,
        axis,
      }}
    >
      {children}
    </ParametersContext.Provider>
  )
}
