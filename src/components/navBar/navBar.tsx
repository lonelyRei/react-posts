import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './navBar.css'
import { IRoute, navAuthUserRouts, navCommonUserRouts, navNotAuthUserRouts } from '../routing/routePaths'
import { AuthContext } from '../../context'
import { Spinner } from '../UI/spinner/Spinner'

export const NavBar: React.FC = (): JSX.Element => {
    const context = useContext(AuthContext)
    const navigate = useNavigate()

    // Выполняет logout
    const logout = (): void => {
        context.auth.setIsAuth(false)
        localStorage.removeItem('auth')
        navigate('/login')
    }
    // если процесс авторизации все еще не завершен, то вернем спиннер
    if (context.auth.isLoading) {
        return <Spinner />
    }

    // Если пользователь авторизован, то выдаем одни роуты, иначе другие
    if (context.auth.isAuth) {
        return (
            <div className="nav-bar">
                {[...navCommonUserRouts, ...navAuthUserRouts].map((path: IRoute): JSX.Element => {
                    return (
                        <Link className="nav-bar__link" to={path.path} key={path.path}>
                            {path.name}
                        </Link>
                    )
                })}
                <span className="nav-bar__link" onClick={logout}>
                    Выйти
                </span>
            </div>
        )
    } else {
        return (
            <div className="nav-bar">
                {[...navCommonUserRouts, ...navNotAuthUserRouts].map((path: IRoute): JSX.Element => {
                    return (
                        <Link className="nav-bar__link" to={path.path} key={path.path}>
                            {path.name}
                        </Link>
                    )
                })}
            </div>
        )
    }
}
