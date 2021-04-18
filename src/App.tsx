import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'

import { ParametersContextProvider } from './ui-components/Parameters/Parameters.context'
import { GraphicCanvas } from './GraphicCanvas'

function App() {
  return (
    <CssBaseline>
      <ParametersContextProvider>
        <GraphicCanvas />
      </ParametersContextProvider>
    </CssBaseline>
  )
}

export default App
