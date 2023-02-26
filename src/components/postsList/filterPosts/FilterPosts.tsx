import React from 'react'
import { CustomInput } from '../../UI/input/CustomInput'
import { CustomDropDown } from '../../UI/dropDown/CustomDropDown'
import { postOptions, PostThemeAny } from '../../../types'
import './filterPosts.css'

export const FilterPosts: React.FC<IFilterPostsProps> = (props: IFilterPostsProps): JSX.Element => {
    return (
        <div>
            <CustomInput placeholder="Поиск по постам..." value={props.query} onChange={props.setQuery} />
            <span className="filterThemePick">Выбор темы:</span>
            <CustomDropDown
                defaultValue="Выбор темы для отображения"
                options={[...postOptions, PostThemeAny]}
                value={props.selectedTheme}
                onChange={(theme: string): void => props.setSelectedTheme(theme)}
            />
        </div>
    )
}

interface IFilterPostsProps {
    query: string // Строка поиска
    setQuery: (value: string) => void // Callback для обновления состояния строки поиска
    selectedTheme: string // Выбранная тема
    setSelectedTheme: (value: string) => void // Callback для обновления состояния выбранной темы
}
