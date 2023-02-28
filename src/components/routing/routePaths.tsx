import React, { ReactNode } from 'react'
import { PostsList } from '../postsList/PostsList'
import { PostAbout } from '../postsList/postAbout/PostAbout'
import { StartPage } from '../index/StartPage'

export const routePaths: IRoute[] = [
    {
        name: 'Стартовая страница',
        path: '/',
        component: <StartPage />,
    },
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

export const navigationPaths: IRoute[] = [
    {
        name: 'Стартовая страница',
        path: '/',
        component: <StartPage />,
    },
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
