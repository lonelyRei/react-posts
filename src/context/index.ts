import { createContext } from 'react'
import { IMainContext } from '../types'

export const AuthContext = createContext<IMainContext>({
    auth: { isAuth: false, setIsAuth: () => {}, isLoading: true },
})
