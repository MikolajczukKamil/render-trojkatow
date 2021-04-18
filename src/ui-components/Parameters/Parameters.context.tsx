import React, { useCallback, useState, createContext, ReactNode } from 'react'

import { Axis, Color, Triangle, Vector3AsArray } from '../../zadanie'
import {
  perspectiveProjection,
  PROJECTIONS,
  Size,
  SIZES,
} from '../../data/availableValues'
import { Projection } from '../../zadanie/Projection'

let triangleId = 0

export interface TriangleSchema {
  id: number
  triangle: Triangle
  move: Vector3AsArray
  rotation: Vector3AsArray
}

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

const defaultValue: ParametersContextValue = {
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
    (code: string) => setProjection(PROJECTIONS.find((p) => p.code === code)!),
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
