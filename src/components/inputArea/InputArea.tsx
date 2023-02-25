import React, { useState } from 'react'
import { CustomInput } from '../UI/input/CustomInput'
import { CustomButton } from '../UI/button/CustomButton'
import './inputArea.css'
import { IPostsListItem, PostsThemes } from '../../types'

export const InputArea: React.FC<IInputAreaProps> = (props: IInputAreaProps) => {
    const [post, setPost] = useState<IPostsListItem>({
        title: '',
        content: '',
        theme: PostsThemes.other,
        id: Date.now(),
    })

    const createPost = (): void => {
        props.createNewPost(post)
        setPost({ title: '', content: '', theme: PostsThemes.other, id: Date.now() })
    }

    return (
        <div className="inputArea">
            <CustomInput
                value={post.title}
                onChange={(value: string): void => {
                    setPost({ ...post, title: value })
                }}
                placeholder="Заголовок"
            />
            <CustomInput
                value={post.content}
                onChange={(value: string): void => {
                    setPost({ ...post, content: value })
                }}
                placeholder="Содержание"
            />
            <CustomButton isDisabled={false} placeholder="Создать пост" onSubmit={createPost} />
        </div>
    )
}

interface IInputAreaProps {
    createNewPost: (post: IPostsListItem) => void
}
