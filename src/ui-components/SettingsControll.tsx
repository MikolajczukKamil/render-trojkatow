import React, { ChangeEvent, ReactChild, useCallback } from 'react'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'

import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 200,
    },
    small: {
      minWidth: 150,
    },
    select: {
      '&:focus': {
        background: 'inherit',
      },
    },
  })
)

interface SettingsControllProps<T extends string | number> {
  onChange?: (value: T) => void
  /** Smaller field */
  small?: boolean
  value: T
  label: string
  children: ReactChild[]
}

export function SettingsControll<T extends string | number>({
  onChange,
  value,
  label,
  children,
  small,
}: SettingsControllProps<T>) {
  const classes = useStyles()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleChange = useCallback(
    onChange
      ? ({ target: { value } }: ChangeEvent<{ value: any }>) => onChange(value)
      : () => {},
    [onChange]
  )

  return (
    <FormControl
      variant="outlined"
      className={clsx(classes.formControl, { [classes.small]: small })}
    >
      <InputLabel>{label}</InputLabel>

      <Select
        label={label}
        value={value}
        className={classes.select}
        onChange={handleChange}
      >
        {children}
      </Select>
    </FormControl>
  )
}
