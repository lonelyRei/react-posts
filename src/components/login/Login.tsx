import React, { useContext, useState } from 'react'
import '../UI/input/CustomInput'
import { CustomInput } from '../UI/input/CustomInput'
import { CustomButton, IButtonType } from '../UI/button/CustomButton'
import { NavigateFunction, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context'
import { IMainContext } from '../../types'

export const Login: React.FC = (): JSX.Element => {
    const navigate: NavigateFunction = useNavigate()
    const [userData, setUserData] = useState<IUserData>({ login: '', password: '' })

    // Получаем контекст
    const context: IMainContext = useContext(AuthContext)

    // выполняет вход
    const login = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault()
        setUserData({ login: '', password: '' })
        // Заглушка (должно быть обращение на сервер)
        Promise.resolve()
            .then(() => {
                context.auth.setIsAuth(true)
                alert('Успешная авторизация!')
                localStorage.setItem('auth', 'true')
                navigate('/posts')
            })
            .catch(() => {
                context.auth.setIsAuth(false)
                alert('Неуспешная авторизация!')
                navigate('/login')
            })
    }

    return (
        <div className="login">
            <form className="login__inner" onSubmit={login}>
                <CustomInput
                    placeholder="login"
                    value={userData.login}
                    onChange={(value: string): void => setUserData({ ...userData, login: value })}
                />
                <CustomInput
                    type="password"
                    placeholder="password"
                    value={userData.password}
                    onChange={(value: string): void => setUserData({ ...userData, password: value })}
                />
                <CustomButton placeholder="Войти" type={IButtonType.submit} />
            </form>
        </div>
    )
}

interface IUserData {
    login: string
    password: string
}
