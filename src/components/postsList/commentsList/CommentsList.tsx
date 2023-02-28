import React, { useEffect, useState } from 'react'
import { useFetching } from '../../../hooks/useFetching'
import PostService from '../../../API/PostService'
import { ICommentItem } from '../../../types'
import { Spinner } from '../../UI/spinner/Spinner'
import { CommentItem } from './commentItem/CommentItem'

export const CommentsList: React.FC<ICommentsListProps> = (props: ICommentsListProps): JSX.Element => {
    // Состояние с комментариями
    const [comments, setComments] = useState<ICommentItem[]>([])
    // Получаем список комментариев по id из параметров
    const [commentsCallback, isCommentsLoading, isCommentsError] = useFetching(async () => {
        if (props.postId) {
            const commentsList = await PostService.getCommentsById(props.postId)
            setComments(commentsList)
        }
    })

    useEffect(() => {
        // @ts-ignore
        commentsCallback().then()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="comments">
            {isCommentsLoading ? (
                <Spinner />
            ) : isCommentsError ? (
                <div>Ошибка загрузки комментарием</div>
            ) : (
                comments.map((comment: ICommentItem, index: number) => {
                    return <CommentItem key={comment.id} name={comment.name} body={comment.body} position={index + 1} />
                })
            )}
        </div>
    )
}

interface ICommentsListProps {
    postId: string
}
