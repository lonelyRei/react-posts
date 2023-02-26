// Темы постов
export enum PostsThemes {
    programming = 'Программирование',
    sport = 'Спорт',
    news = 'Новости',
    other = 'Другое',
}

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

// Специальное значение опции выпадающего списка для отображения всех постов
export const PostThemeAny: ICustomDropDownOption = {
    name: 'Все',
    value: 'any',
}
