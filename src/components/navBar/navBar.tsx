import React from 'react'
import { Link } from 'react-router-dom'
import './navBar.css'
import { IRoute, navigationPaths } from '../routing/routePaths'

export const NavBar: React.FC = (): JSX.Element => {
    return (
        <div className="nav-bar">
            {navigationPaths.map((path: IRoute): JSX.Element => {
                return (
                    <Link className="nav-bar__link" to={path.path} key={path.path}>
                        {path.name}
                    </Link>
                )
            })}
        </div>
    )
}
