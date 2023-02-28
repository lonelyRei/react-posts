import React from 'react'
import { Link } from 'react-router-dom'
import './navBar.css'

export const NavBar: React.FC<INavBarProps> = (props: INavBarProps): JSX.Element => {
    return (
        <div className="nav-bar">
            <Link className="nav-bar__link" to="/">
                Стартовая
            </Link>
            <Link className="nav-bar__link" to="/posts">
                Посты
            </Link>
        </div>
    )
}

interface INavBarProps {}
