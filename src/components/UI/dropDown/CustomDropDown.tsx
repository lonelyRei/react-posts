import React from 'react'
import './customDropDown.css'
import { ICustomDropDownOption } from '../../../types'

export const CustomDropDown: React.FC<ICustomDropDownProps> = (props: ICustomDropDownProps): JSX.Element => {
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        props.onChange(event.target.value)
    }

    return (
        <div className="customDropDown">
            <select value={props.value} onChange={handleChange}>
                <option value="" disabled>
                    {props.defaultValue}
                </option>
                {props.options.map((option: ICustomDropDownOption): JSX.Element => {
                    return (
                        <option value={option.value} key={option.value}>
                            {option.name}
                        </option>
                    )
                })}
            </select>
        </div>
    )
}

interface ICustomDropDownProps {
    value: string
    onChange: (value: string) => void

    defaultValue: string

    options: ICustomDropDownOption[]
}
