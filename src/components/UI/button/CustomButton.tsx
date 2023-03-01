import React from 'react'
import './customButton.css'

export enum IButtonType {
    submit = 'submit',
    reset = 'reset',
    button = 'button',
}
interface ICustomButtonProps {
    placeholder: string // Текст, помещаемый внутрь кнопки
    onSubmit?: () => void // Callback, вызываемый при клике на кнопку
    isDisabled?: boolean // Нужно ли отключить возможность клика по кнопке
    type?: IButtonType
}

export const CustomButton: React.FC<ICustomButtonProps> = (props: ICustomButtonProps): JSX.Element => {
    const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        if (props.type !== IButtonType.submit) {
            event.preventDefault()
            if (props.onSubmit) props.onSubmit()
        }
    }
    return (
        <button type={props.type} className="customButton" onClick={handleClick} disabled={props.isDisabled}>
            {props.placeholder}
        </button>
    )
}
