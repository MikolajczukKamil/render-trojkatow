import React, { useContext, useRef } from 'react'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'

import { Parameters, ParametersContext } from './Parameters'
import { useImage } from './useImage'

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
  const {
    windowSize: { width, height },
  } = useContext(ParametersContext)

  useImage(canvas)

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
