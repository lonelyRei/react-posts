import React from 'react'
import './spinner.css'

export const Spinner: React.FC = () => {
    return (
        <div className="spinner__outer">
            <div className="spinner"></div>
        </div>
    )
}
