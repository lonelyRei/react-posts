import React from 'react'
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import { NavBar } from './components/navBar/navBar'
import { Routing } from './components/routing/Routing'

// ToDo: Сделать роутинг

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <NavBar />
                <Routing />
            </BrowserRouter>
        </div>
    )
}

export default App
