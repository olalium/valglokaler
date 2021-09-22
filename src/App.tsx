import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import RootContainer from './components/RootContainer'

const App = (): JSX.Element => (
    <Router>
        <RootContainer />
    </Router>
)

export default App
