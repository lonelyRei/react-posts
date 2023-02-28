import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useFetching } from '../../../hooks/useFetching'
import PostService from '../../../API/PostService'
import { IPostsListItem } from '../../../types'
import { Spinner } from '../../UI/spinner/Spinner'
import './postAbout.css'
import { CommentsList } from '../commentsList/CommentsList'
import { CustomButton } from '../../UI/button/CustomButton'
export const PostAbout: React.FC = () => {
    // Состояние с постом
    const [post, setPost] = useState<IPostsListItem>({ content: '', id: 0, theme: '', title: '' })

    // Состояние необходимости добавления комментариев
    const [isNeedComments, setIsNeedComments] = useState<boolean>(false)

    // Забираем параметры
    const params = useParams()

    // Получаем пост по id из параметров
    const [postsCallback, isLoading, isError] = useFetching(async () => {
        if (params.id) {
            const post = await PostService.getPost(params.id)
            setPost(post)
        }
    })

    // Вызываем функцию для получения поста только один раз (при рендере компонента)
    useEffect(() => {
        // @ts-ignore
        postsCallback().then()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // ToDo: Декомпозиция компонента PostAbout

    return (
        <div className="post-about">
            {isLoading ? (
                <Spinner />
            ) : isError ? (
                <div className="post-about__error">Ошибка загрузки содержимого поста</div>
            ) : (
                <div className="post-about__outer">
                    <div className="post-about__header">
                        <span className="post-about__theme">Тема: {post.theme}</span>
                        <span className="post-about__title">Название: {post.title}</span>
                    </div>

                    <div className="post-about--content">
                        <span className="post-about__content-title">Содержание:</span>
                        <div className="post-about__content-text">{post.content}</div>
                    </div>
                    <div className="post-about__comments-area">
                        {isNeedComments ? (
                            <>
                                <CommentsList postId={params.id ? params.id : '0'} />
                                <CustomButton
                                    placeholder="Скрыть комментарии"
                                    onSubmit={() => {
                                        setIsNeedComments(false)
                                    }}
                                />
                            </>
                        ) : (
                            <CustomButton
                                placeholder="Загрузить комментарии"
                                onSubmit={() => {
                                    setIsNeedComments(true)
                                }}
                            />
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
