import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import { IRoute, commonUserRouts, authUserRouts, notAuthUserRouts } from './routePaths'
import { AuthContext } from '../../context'
import { Spinner } from '../UI/spinner/Spinner'

export const Routing: React.FC = (): JSX.Element => {
    const context = useContext(AuthContext)

    // если процесс авторизации все еще не завершен, то вернем спиннер
    if (context.auth.isLoading) {
        return <Spinner />
    }

    // Если пользователь авторизовался, то отображаем все доступные роуты
    if (context.auth.isAuth) {
        return (
            <Routes>
                {[...commonUserRouts, ...authUserRouts].map((route: IRoute): JSX.Element => {
                    return <Route key={route.path} path={route.path} element={route.component} />
                })}
                <Route path="*" element={<div>Page not found :(</div>} />
            </Routes>
        )
    } else {
        // Если не авторизован, то отдаем только для неавторизованных
        return (
            <Routes>
                {[...commonUserRouts, ...notAuthUserRouts].map((route: IRoute): JSX.Element => {
                    return <Route key={route.path} path={route.path} element={route.component} />
                })}
                <Route path="*" element={<div>Page not found :(</div>} />
            </Routes>
        )
    }
}
