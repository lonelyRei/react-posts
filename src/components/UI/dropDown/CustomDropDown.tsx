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
    value: string // Выбранное значение (двустороннее связывание)
    onChange: (value: string) => void // Callback для двустороннего связывания

    defaultValue: string // Значение по умолчанию (находится первым в выпадающем списке (disabled))

    options: ICustomDropDownOption[] // Список опция для выпадающего списка
}
