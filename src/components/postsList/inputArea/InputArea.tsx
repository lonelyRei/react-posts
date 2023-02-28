import React, { useState } from 'react'
import { CustomInput } from '../../UI/input/CustomInput'
import { CustomButton } from '../../UI/button/CustomButton'
import './inputArea.css'
import { IPostsListItem, postOptions, PostsThemes } from '../../../types'
import { CustomDropDown } from '../../UI/dropDown/CustomDropDown'

export const InputArea: React.FC<IInputAreaProps> = (props: IInputAreaProps) => {
    const [post, setPost] = useState<IPostsListItem>({
        title: '',
        content: '',
        theme: PostsThemes.other,
        id: Date.now(),
    })

    // Создание поста
    const createPost = (): void => {
        // Вызываем callback
        props.createNewPost(post)
        // Обнуляем состояние
        setPost({ title: '', content: '', theme: post.theme, id: Date.now() })
    }

    return (
        <div className="inputArea">
            <h2 className="title">Создание поста:</h2>
            <CustomDropDown
                value={post.theme}
                defaultValue={'Выбрать тему'}
                onChange={(theme: string) => {
                    setPost({ ...post, theme: theme })
                }}
                options={postOptions}
            />
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
