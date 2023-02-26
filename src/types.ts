export enum PostsThemes {
    programming = 'Программирование',
    sport = 'Спорт',
    news = 'Новости',
    other = 'Другое',
}

export interface ICustomDropDownOption {
    value: string
    name: string
}

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

export interface IPostsListItem {
    title: string
    content: string
    theme: string
    id: number
}
