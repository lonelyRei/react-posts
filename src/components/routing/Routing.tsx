import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { IRoute, routePaths } from './routePaths'

export const Routing: React.FC = (): JSX.Element => {
    return (
        <Routes>
            {routePaths.map((route: IRoute): JSX.Element => {
                return <Route key={route.path} path={route.path} element={route.component} />
            })}
            <Route path="*" element={<div>Page not found :(</div>} />
        </Routes>
    )
}
