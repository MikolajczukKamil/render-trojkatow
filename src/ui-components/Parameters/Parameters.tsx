import React, { useContext } from 'react'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import Switch from '@material-ui/core/Switch'
import Typography from '@material-ui/core/Typography'
import FormControlLabel from '@material-ui/core/FormControlLabel'

import {
  AXIS,
  SIZES,
  FOCALS,
  PIXEL_SIZES,
  PROJECTIONS,
  perspectiveProjection,
} from '../data/availableValues'
import { Axis } from '../../graphics'
import { ParametersContext } from './Parameters.context'
import { SettingsControll, TriangleEditor } from './components'

export function Parameters() {
  const {
    axis,
    depth,
    focal,
    triangles,
    pixelSize,
    projection,
    windowSize,
    handleChangeDepth,
    addTriangleSchema,
    handleChangeProjection,
    handleChangeFocal,
    handleChangePixelSize,
    handleChangeAxis,
    handleChangeWindowSize,
  } = useContext(ParametersContext)

  return (
    <>
      <div>
        <SettingsControll
          onChange={handleChangeProjection}
          label="Rzutowanie"
          value={projection.name}
        >
          {PROJECTIONS.map((proj) => (
            <MenuItem key={proj.name} value={proj.name}>
              {proj.name}
            </MenuItem>
          ))}
        </SettingsControll>

        <SettingsControll
          onChange={handleChangeWindowSize}
          label="Rozmiar okna"
          value={windowSize.code}
        >
          {SIZES.map((size) => (
            <MenuItem key={size.code} value={size.code}>
              {size.width} x {size.height}
            </MenuItem>
          ))}
        </SettingsControll>

        <SettingsControll
          onChange={handleChangePixelSize}
          label="Rozmiar piksela"
          value={pixelSize}
          small
        >
          {PIXEL_SIZES.map((pxSize) => (
            <MenuItem key={pxSize} value={pxSize}>
              {pxSize.toFixed(3)}
            </MenuItem>
          ))}
        </SettingsControll>

        <SettingsControll
          onChange={handleChangeAxis}
          label="Oś"
          value={axis}
          small
        >
          {AXIS.map((ax) => (
            <MenuItem key={ax} value={ax}>
              {Axis[ax].toUpperCase()}
            </MenuItem>
          ))}
        </SettingsControll>

        {projection.name === perspectiveProjection.name && (
          <SettingsControll
            onChange={handleChangeFocal}
            label="Ogniskowa"
            value={focal}
            small
          >
            {FOCALS.map((focal) => (
              <MenuItem key={focal} value={focal}>
                {focal.toFixed(2)}
              </MenuItem>
            ))}
          </SettingsControll>
        )}

        <FormControlLabel
          control={
            <Switch
              checked={depth}
              onChange={handleChangeDepth}
              color="primary"
            />
          }
          label="Odległość"
        />
      </div>

      <div>
        <Typography variant="h5" gutterBottom>
          Trójkąty
        </Typography>

        {triangles.map((schema) => (
          <TriangleEditor key={schema.id} schema={schema} />
        ))}

        <Button variant="outlined" onClick={addTriangleSchema}>
          Dodaj trójkąt
        </Button>
      </div>
    </>
  )
}
