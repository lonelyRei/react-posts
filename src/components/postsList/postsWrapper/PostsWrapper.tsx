import React from 'react'
import { CustomDropDown } from '../../UI/dropDown/CustomDropDown'
import { IPostsListItem, postOptions, PostThemeAny } from '../../../types'
import { PostItem } from '../postItem/PostItem'
import './postsWrapper.css'

export const PostsWrapper: React.FC<IPostsWrapperProps> = (props: IPostsWrapperProps): JSX.Element => {
    return (
        <div className="postsWrapper">
            {props.posts.length > 0 ? (
                <div>
                    <CustomDropDown
                        defaultValue="Выбор темы"
                        options={[...postOptions, PostThemeAny]}
                        value={props.selectedTheme}
                        onChange={(theme: string): void => props.setSelectedTheme(theme)}
                    />
                    {props.filteredPosts.length > 0 ? (
                        props.filteredPosts.map((post: IPostsListItem, index: number): JSX.Element => {
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
                        })
                    ) : (
                        <h2 className="postListEmpty">Посты отсутствуют</h2>
                    )}
                </div>
            ) : (
                <h2 className="postListEmpty">Посты отсутствуют</h2>
            )}
        </div>
    )
}

interface IPostsWrapperProps {
    posts: IPostsListItem[]
    selectedTheme: string
    setSelectedTheme: (theme: string) => void
    filteredPosts: IPostsListItem[]
    removePost: (id: number) => void
}
