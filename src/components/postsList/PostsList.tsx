import React, { useMemo, useState } from 'react'
import { IPostsListItem, PostThemeAny } from '../../types'
import { InputArea } from '../inputArea/InputArea'
import './postsList.css'
import { PostsWrapper } from './postsWrapper/PostsWrapper'
import { FilterPosts } from './filterPosts/FilterPosts'

export const PostsList: React.FC<{}> = (props: {}): JSX.Element => {
    // Все посты, созданные пользователем
    const [posts, setPosts] = useState<IPostsListItem[]>([])

    // Выбранный алгоритм сортироваки постов:
    // query - Строка поиска по заголовку или контенту
    // selectedTheme - Выбранная тема постов
    const [filterAlgorithm, setFilterAlgorithm] = useState<{ query: string; selectedTheme: string }>({
        query: '',
        selectedTheme: PostThemeAny.value,
    })

    // Callback создания нового поста, обновляет состояние постов, созданных юзером
    const createNewPost = (post: IPostsListItem): void => {
        setPosts([...posts, post])
    }

    // Callback удвления поста, удаляет пост по id, обновляя состояние постов, созданных юзером
    const removePost = (id: number): void => {
        setPosts(
            posts.filter((post: IPostsListItem): boolean => {
                return post.id !== id
            })
        )
    }

    // Посты, отфильтрованные по теме
    // Если выбрана тема any, то отображает все посты, созданные юзером, иначе только посты, попадающие под категорию
    // В массив зависимостей передается выбранная тема и список всех постов
    const filteredPosts = useMemo(() => {
        if (filterAlgorithm.selectedTheme === PostThemeAny.value) {
            return posts
        } else {
            return posts.filter((post) => post.theme === filterAlgorithm.selectedTheme)
        }
    }, [filterAlgorithm.selectedTheme, posts])

    // Посты, отфильтрованные по категориям + с учетом строки поиска по заголовку и контенту
    // В массив зависимостей передается строка поиска и массив отфильтрованных по темам постов
    const filteredPostsWithQuery = useMemo(() => {
        return filteredPosts.filter((post: IPostsListItem): boolean => {
            return (
                post.content.toLowerCase().includes(filterAlgorithm.query.toLowerCase()) ||
                post.title.toLowerCase().includes(filterAlgorithm.query.toLowerCase())
            )
        })
    }, [filteredPosts, filterAlgorithm.query])

    return (
        <div className="postList">
            <h1 className="postsListTitle">Список постов</h1>
            <InputArea createNewPost={createNewPost} />
            <div className="postsArea">
                <FilterPosts
                    setSelectedTheme={(value: string) =>
                        setFilterAlgorithm({ ...filterAlgorithm, selectedTheme: value })
                    }
                    selectedTheme={filterAlgorithm.selectedTheme}
                    query={filterAlgorithm.query}
                    setQuery={(value: string) => setFilterAlgorithm({ ...filterAlgorithm, query: value })}
                />
                <PostsWrapper filteredPosts={filteredPostsWithQuery} removePost={removePost} />
            </div>
        </div>
    )
}
