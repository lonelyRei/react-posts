import React, { useState } from 'react'
import { IPostsListItem, PostThemeAny } from '../../types'
import { InputArea } from '../inputArea/InputArea'
import './postsList.css'
import { PostsWrapper } from './postsWrapper/PostsWrapper'
import { FilterPosts } from './filterPosts/FilterPosts'
import { useSortedPostsWithQuery } from '../../hooks/usePosts'

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

    // Посты, отфильтрованные в соответствии с выбранной темой и поисковым запросом
    const filteredPostsWithQuery = useSortedPostsWithQuery(filterAlgorithm.query, filterAlgorithm.selectedTheme, posts)

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
