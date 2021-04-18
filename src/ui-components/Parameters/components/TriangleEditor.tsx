import React, { ChangeEvent, useContext, useState } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import { Button } from '@material-ui/core'
import clsx from 'clsx'

import { hexToRgb } from '../utils'
import { TriangleSchema } from '../../TriangleSchema'
import { ParametersContext } from '../Parameters.context'
import { Color, Triangle, Vector3AsArray } from '../../../graphics'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    colorPreview: {
      width: theme.spacing(7),
      height: theme.spacing(7),
      boxShadow: theme.shadows[3],
      borderRadius: theme.shape.borderRadius,
      display: 'inline-flex',
    },
    inputs: {
      maxWidth: 145,
      margin: theme.spacing(1),
    },
    save: {
      display: 'inline-flex',
      verticalAlign: 'top',
      margin: theme.spacing(2),
    },
  })
)

interface TriangleProps {
  schema: TriangleSchema
}

export function TriangleEditor({ schema }: TriangleProps) {
  const classes = useStyles()

  const { updateTriangleSchema } = useContext(ParametersContext)

  const [rotation, setRotation] = useState(schema.rotation.join(', '))
  const [move, setMove] = useState(() => schema.move.join(', '))
  const [pointA, setPointA] = useState(() =>
    schema.triangle.p1.asVector3Array().join(', ')
  )
  const [pointB, setPointB] = useState(() =>
    schema.triangle.p2.asVector3Array().join(', ')
  )
  const [pointC, setPointC] = useState(() =>
    schema.triangle.p3.asVector3Array().join(', ')
  )
  const [color, setColor] = useState(
    () => '#' + schema.triangle.color.toRGBArray().join('')
  )

  const handleChangeColor = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    if (value.length <= 7 && value.match(/^#[0-9a-f]*$/i)) {
      setColor(value)
    }
  }

  const handleChangeRotation = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => setRotation(value)

  const handleChangeMove = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => setMove(value)

  const handleChangePointA = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => setPointA(value)

  const handleChangePointB = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => setPointB(value)

  const handleChangePointC = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => setPointC(value)

  const handleSave = () => {
    const _rotation = rotation
      .replaceAll(' ', '')
      .split(',')
      .map((v) => parseFloat(v)) as Vector3AsArray

    if (_rotation.length !== 3 || _rotation.some((v) => Number.isNaN(v))) {
      alert(`Błąd danych rotacji`)

      return
    }

    const _move = move
      .replaceAll(' ', '')
      .split(',')
      .map((v) => parseFloat(v)) as Vector3AsArray

    if (_move.length !== 3 || _move.some((v) => Number.isNaN(v))) {
      alert(`Błąd danych przemieszczenia`)

      return
    }

    const _color = hexToRgb(color)

    if (_color === null) {
      alert(`Błąd danych kolor`)

      return
    }

    const _pointA = pointA
      .replaceAll(' ', '')
      .split(',')
      .map((v) => parseFloat(v)) as Vector3AsArray

    if (_pointA.length !== 3 || _pointA.some((v) => Number.isNaN(v))) {
      alert(`Błąd danych punkt A`)

      return
    }

    const _pointB = pointB
      .replaceAll(' ', '')
      .split(',')
      .map((v) => parseFloat(v)) as Vector3AsArray

    if (_pointB.length !== 3 || _pointB.some((v) => Number.isNaN(v))) {
      alert(`Błąd danych punkt B`)

      return
    }

    const _pointC = pointC
      .replaceAll(' ', '')
      .split(',')
      .map((v) => parseFloat(v)) as Vector3AsArray

    if (_pointC.length !== 3 || _pointC.some((v) => Number.isNaN(v))) {
      alert(`Błąd danych punkt C`)

      return
    }

    updateTriangleSchema({
      ...schema,
      rotation: _rotation,
      move: _move,
      triangle: Triangle.of(
        _pointA,
        _pointB,
        _pointC,
        new Color(..._color, 255)
      ),
    })
  }

  return (
    <div>
      <div
        className={clsx(classes.colorPreview, classes.inputs)}
        style={{ backgroundColor: color }}
      />

      <TextField
        value={color}
        label="Kolor"
        variant="outlined"
        className={classes.inputs}
        onChange={handleChangeColor}
      />

      <TextField
        value={pointA}
        label="Punkt A"
        variant="outlined"
        className={classes.inputs}
        onChange={handleChangePointA}
      />

      <TextField
        value={pointB}
        label="Punkt B"
        variant="outlined"
        className={classes.inputs}
        onChange={handleChangePointB}
      />

      <TextField
        value={pointC}
        label="Punkt C"
        variant="outlined"
        className={classes.inputs}
        onChange={handleChangePointC}
      />

      <TextField
        value={rotation}
        label="Roll, Pitch, Yaw"
        variant="outlined"
        className={classes.inputs}
        onChange={handleChangeRotation}
      />

      <TextField
        value={move}
        label="Przesunięcie: X, Y, Z"
        variant="outlined"
        className={classes.inputs}
        onChange={handleChangeMove}
      />

      <Button
        color="primary"
        variant="contained"
        className={classes.save}
        onClick={handleSave}
      >
        Zapisz
      </Button>
    </div>
  )
}
