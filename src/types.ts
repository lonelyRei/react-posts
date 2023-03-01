// Темы постов
import React from 'react'

export enum PostsThemes {
    programming = 'Программирование',
    sport = 'Спорт',
    news = 'Новости',
    other = 'Другое',
}

export const postsThemesArray: PostsThemes[] = [
    PostsThemes.programming,
    PostsThemes.sport,
    PostsThemes.news,
    PostsThemes.other,
]

// Интерфейс опций для выпадающего списка
export interface ICustomDropDownOption {
    value: string // Значение
    name: string // Название
}

// Опции для выпадающего списка
export const postOptions: ICustomDropDownOption[] = [
    {
        value: PostsThemes.other,
        name: PostsThemes.other,
    },
    {
        value: PostsThemes.programming,
        name: PostsThemes.programming,
    },
    {
        value: PostsThemes.news,
        name: PostsThemes.news,
    },
    {
        value: PostsThemes.sport,
        name: PostsThemes.sport,
    },
]

// Интерфейс, описывающий пост
export interface IPostsListItem {
    title: string // Заголовок
    content: string // Основная часть (контект)
    theme: string // Тема
    id: number // Идентификатор
}

// Интерфейс, описывающий комментарий
export interface ICommentItem {
    id: number // Идентификатор комментария
    name: string // Имя пользователя

    body: string // Тело комментария
}

// Специальное значение опции выпадающего списка для отображения всех постов
export const PostThemeAny: ICustomDropDownOption = {
    name: 'Все',
    value: 'any',
}

interface IAuthInterface {
    isAuth: boolean
    setIsAuth: React.Dispatch<React.SetStateAction<boolean>>
    isLoading: boolean
}

export interface IMainContext {
    auth: IAuthInterface
}

export const paginationOptions: ICustomDropDownOption[] = [
    {
        name: '5',
        value: '5',
    },
    {
        name: '10',
        value: '10',
    },
    {
        name: '25',
        value: '25',
    },
    {
        name: 'Показать все',
        value: '-1',
    },
]
