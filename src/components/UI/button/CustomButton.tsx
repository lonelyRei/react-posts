import React from 'react'
import './customButton.css'

export const CustomButton: React.FC<ICustomButtonProps> = (props: ICustomButtonProps): JSX.Element => {
    const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        event.preventDefault()
        if (props.onSubmit) props.onSubmit()
    }
    return (
        <button className="customButton" onClick={handleClick} disabled={props.isDisabled}>
            {props.placeholder}
        </button>
    )
}

interface ICustomButtonProps {
    placeholder: string
    onSubmit?: () => void
    isDisabled?: boolean
}
