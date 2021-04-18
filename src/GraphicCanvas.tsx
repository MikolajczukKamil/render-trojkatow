import React, { useContext, useEffect, useRef } from 'react'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'

import { flatColors } from './utils'
import { Render, Bitmap, Camera } from './zadanie'
import { Parameters } from './ui-components/Parameters/Parameters'
import { ParametersContext } from './ui-components/Parameters/Parameters.context'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    image: {
      display: 'flex',
      overflow: 'hidden',
      margin: theme.spacing(2, 'auto'),
      maxWidth: '100%',
    },
    canvas: {
      display: 'block',
    },
    settings: {
      padding: theme.spacing(2),
      [theme.breakpoints.up('md')]: {
        padding: theme.spacing(4),
      },
    },
  })
)

export function GraphicCanvas() {
  const classes = useStyles()
  const canvas = useRef<HTMLCanvasElement>(null)
  const ctx = useRef<CanvasRenderingContext2D>(null)
  const {
    axis,
    focal,
    pixelSize,
    projection,
    triangles,
    windowSize: { width, height },
  } = useContext(ParametersContext)

  useEffect(() => {
    // @ts-ignore .current - readonly
    if (!ctx.current) ctx.current = canvas.current!.getContext('2d')!

    const imgData: ImageData = ctx.current.getImageData(0, 0, width, height)

    const image: Bitmap = Render(
      triangles,
      width,
      height,
      pixelSize,
      new Camera(focal, axis),
      projection
    )

    const imgData2 = new ImageData(
      flatColors(image),
      imgData.width,
      imgData.height
    )

    ctx.current.putImageData(imgData2, 0, 0)
  }, [triangles, axis, focal, pixelSize, projection, width, height])

  return (
    <Container>
      <Paper elevation={3} className={classes.image} style={{ width, height }}>
        <canvas
          ref={canvas}
          width={width}
          height={height}
          className={classes.canvas}
        />
      </Paper>

      <Paper className={classes.settings}>
        <Typography variant="h4" gutterBottom>
          Ustawienia
        </Typography>

        <Parameters />
      </Paper>
    </Container>
  )
}
