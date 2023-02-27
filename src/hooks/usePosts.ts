import { useMemo } from 'react'
import { IPostsListItem, PostThemeAny } from '../types'

// Кастомный хук для фильтрации постов в соответствии с выбранной темой
// Если выбрана любая тема, то взвращает все посты, иначе фильтрует по выбранной теме
export const useSortedPostsByTheme = (theme: string, posts: IPostsListItem[]): IPostsListItem[] => {
    return useMemo(() => {
        if (theme === PostThemeAny.value) {
            return posts
        } else {
            return posts.filter((post) => post.theme === theme)
        }
    }, [theme, posts])
}

// Кастомный хук для фильтрации постов, отфильтрованных по темам в соответствии с поисковым запросом
export const useSortedPostsWithQuery = (
    query: string,
    selectedTheme: string,
    posts: IPostsListItem[]
): IPostsListItem[] => {
    // Получаем посты, отфильтрованные по темам
    const filteredPosts: IPostsListItem[] = useSortedPostsByTheme(selectedTheme, posts)
    return useMemo(() => {
        return filteredPosts.filter((post: IPostsListItem): boolean => {
            return (
                post.content.toLowerCase().includes(query.toLowerCase()) ||
                post.title.toLowerCase().includes(query.toLowerCase())
            )
        })
    }, [filteredPosts, query])
}
