import React from 'react'
import './customInput.css'

export const CustomInput: React.FC<ICustomInputProps> = (props: ICustomInputProps): JSX.Element => {
    return (
        <input
            className="input"
            type={props.type}
            value={props.value}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                props.onChange(event.target.value)
            }}
            placeholder={props.placeholder}
        />
    )
}

interface ICustomInputProps {
    value: string // Строка для двустороннего связывания
    onChange: (value: string) => void // Callback для двустороннего связывания
    placeholder: string // Placeholder для строки ввода
    type?: string
}
