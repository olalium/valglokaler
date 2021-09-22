import React from 'react'
import { Route, Switch } from 'react-router-dom'
import * as Spaces from 'react-spaces'

import Header from './header/Header'
import SearchAndResults from './searchandresults/SearchAndResults'
import './RootContainer.css'

const RootContainer = (): JSX.Element => (
    <Switch>
        <Spaces.ViewPort>
            <Spaces.Top size={48} className="RootContainer Header">
                <Spaces.Fill>
                    <Header />
                </Spaces.Fill>
            </Spaces.Top>
            <Spaces.Fill>
                <Route path="/">
                    <SearchAndResults />
                </Route>
            </Spaces.Fill>
        </Spaces.ViewPort>
    </Switch>
)

export default RootContainer
