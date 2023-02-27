import React, { useEffect, useState } from 'react'
import { IPostsListItem, PostThemeAny } from '../../types'
import { InputArea } from '../inputArea/InputArea'
import './postsList.css'
import { PostsWrapper } from './postsWrapper/PostsWrapper'
import { FilterPosts } from './filterPosts/FilterPosts'
import { useSortedPostsWithQuery } from '../../hooks/usePosts'
import { useFetching } from '../../hooks/useFetching'
import PostService from '../../API/PostService'
import { Spinner } from '../UI/spinner/Spinner'

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

    // Callback удаления поста, удаляет пост по id, обновляя состояние постов, созданных юзером
    const removePost = (id: number): void => {
        setPosts(
            posts.filter((post: IPostsListItem): boolean => {
                return post.id !== id
            })
        )
    }

    // Посты, отфильтрованные в соответствии с выбранной темой и поисковым запросом
    const filteredPostsWithQuery = useSortedPostsWithQuery(filterAlgorithm.query, filterAlgorithm.selectedTheme, posts)

    const [callback, isLoading, error] = useFetching(async () => {
        const posts = await PostService.getAllPosts()
        setPosts(posts)
    })

    useEffect((): void => {
        // @ts-ignore
        callback().then()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="postList">
            {isLoading ? (
                <Spinner />
            ) : error ? (
                <h1>Не удалось загрузить посты</h1>
            ) : (
                <>
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
                </>
            )}
        </div>
    )
}
