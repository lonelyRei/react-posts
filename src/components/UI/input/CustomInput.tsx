import React from 'react'
import './customInput.css'

export const CustomInput: React.FC<ICustomInputProps> = (props: ICustomInputProps): JSX.Element => {
    return (
        <input
            className="input"
            type="text"
            value={props.value}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                props.onChange(event.target.value)
            }}
            placeholder={props.placeholder}
        />
    )
}

interface ICustomInputProps {
    value: string
    onChange: (value: string) => void
    placeholder: string
}
