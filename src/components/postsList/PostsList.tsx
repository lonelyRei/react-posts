import React, { useState } from 'react'
import { IPostsListItem } from '../../types'
import { InputArea } from '../inputArea/InputArea'
import './postsList.css'
import { PostItem } from './postItem/PostItem'

export const PostsList: React.FC<{}> = (props: {}): JSX.Element => {
    const [posts, setPosts] = useState<IPostsListItem[]>([])
    const createNewPost = (post: IPostsListItem): void => {
        setPosts([...posts, post])
    }

    const removePost = (id: number): void => {
        setPosts(
            posts.filter((post: IPostsListItem): boolean => {
                return post.id !== id
            })
        )
    }

    return (
        <div>
            <h1 className="postsListTitle">Список постов</h1>
            <InputArea createNewPost={createNewPost} />
            <div className="postsWrapper">
                {posts.map((post: IPostsListItem, index: number): JSX.Element => {
                    return (
                        <PostItem
                            title={post.title}
                            position={index + 1}
                            content={post.content}
                            theme={post.theme}
                            id={post.id}
                            key={Date.now() + index}
                            removePost={removePost}
                        />
                    )
                })}
            </div>
        </div>
    )
}
