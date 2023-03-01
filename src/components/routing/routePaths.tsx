import React, { ReactNode } from 'react'
import { PostsList } from '../postsList/PostsList'
import { PostAbout } from '../postsList/postAbout/PostAbout'
import { StartPage } from '../index/StartPage'
import { Login } from '../login/Login'

// Роуты, доступные всем пользователям
export const commonUserRouts: IRoute[] = [
    {
        name: 'Стартовая страница',
        path: '/',
        component: <StartPage />,
    },
]

// Роуты, доступные только авторизованным пользователям
export const authUserRouts: IRoute[] = [
    {
        name: 'Посты',
        path: '/posts',
        component: <PostsList />,
    },
    {
        name: 'Посты по id',
        path: '/posts/:id',
        component: <PostAbout />,
    },
]

// Роуты, доступные только неавторизованным пользователям
export const notAuthUserRouts: IRoute[] = [
    {
        name: 'login',
        path: '/login',
        component: <Login />,
    },
]

// Роуты для отображения в навигационной панели
export const navCommonUserRouts: IRoute[] = [
    {
        name: 'Стартовая страница',
        path: '/',
        component: <StartPage />,
    },
]

// Роуты для отображения в навигационной панели для неавторизованных пользователей
export const navNotAuthUserRouts: IRoute[] = [
    {
        name: 'login',
        path: '/login',
        component: <Login />,
    },
]

// Роуты для отображения в навигационной панели для авторизованных пользователей
export const navAuthUserRouts: IRoute[] = [
    {
        name: 'Посты',
        path: '/posts',
        component: <PostsList />,
    },
]

export interface IRoute {
    name: string
    path: string
    component: ReactNode
}
