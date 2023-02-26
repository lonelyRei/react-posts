import React, { useMemo, useState } from 'react'
import { IPostsListItem, PostThemeAny } from '../../types'
import { InputArea } from '../inputArea/InputArea'
import './postsList.css'
import { PostsWrapper } from './postsWrapper/PostsWrapper'

export const PostsList: React.FC<{}> = (props: {}): JSX.Element => {
    const [posts, setPosts] = useState<IPostsListItem[]>([])

    const [selectedTheme, setSelectedTheme] = useState<string>('')
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

    const filteredPosts = useMemo(() => {
        if (selectedTheme === PostThemeAny.value) {
            return posts
        } else {
            return posts.filter((post) => post.theme.includes(selectedTheme))
        }
    }, [selectedTheme, posts])

    return (
        <div className="postList">
            <h1 className="postsListTitle">Список постов</h1>
            <InputArea createNewPost={createNewPost} />
            <PostsWrapper
                filteredPosts={filteredPosts}
                removePost={removePost}
                posts={posts}
                setSelectedTheme={setSelectedTheme}
                selectedTheme={selectedTheme}
            />
        </div>
    )
}
