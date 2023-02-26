import React from 'react'
import { IPostsListItem } from '../../../types'
import { PostItem } from '../postItem/PostItem'
import './postsWrapper.css'

export const PostsWrapper: React.FC<IPostsWrapperProps> = (props: IPostsWrapperProps): JSX.Element => {
    return (
        <div className="postsWrapper">
            {props.filteredPosts.length > 0 ? (
                <div>
                    {props.filteredPosts.map((post: IPostsListItem, index: number): JSX.Element => {
                        return (
                            <PostItem
                                title={post.title}
                                position={index + 1}
                                content={post.content}
                                theme={post.theme}
                                id={post.id}
                                key={Date.now() + index}
                                removePost={props.removePost}
                            />
                        )
                    })}
                </div>
            ) : (
                <h2 className="postListEmpty">Посты отсутствуют</h2>
            )}
        </div>
    )
}

interface IPostsWrapperProps {
    filteredPosts: IPostsListItem[] // Отфильтрованные посты со всеми алгоритмами фильтрации
    removePost: (id: number) => void // Callback для удаления поста
}
