import React, { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import { NavBar } from './components/navBar/navBar'
import { Routing } from './components/routing/Routing'
import { AuthContext } from './context'

function App() {
    const [isAuth, setIsAuth] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        if (localStorage.getItem('auth')) {
            setIsAuth(true)
            setIsLoading(false)
        }
    }, [])
    return (
        <AuthContext.Provider
            value={{
                auth: {
                    isAuth: isAuth,
                    setIsAuth: setIsAuth,
                    isLoading: isLoading,
                },
            }}
        >
            <div className="App">
                <BrowserRouter>
                    <NavBar />
                    <Routing />
                </BrowserRouter>
            </div>
        </AuthContext.Provider>
    )
}

export default App
