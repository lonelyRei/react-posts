import React, { useEffect, useState } from 'react'
import { useFetching } from '../../../hooks/useFetching'
import PostService from '../../../API/PostService'
import { ICommentItem } from '../../../types'
import { Spinner } from '../../UI/spinner/Spinner'
import { CommentItem } from './commentItem/CommentItem'

export const CommentsList: React.FC<ICommentsListProps> = (props: ICommentsListProps): JSX.Element => {
    // Состояние с комментариями
    const [comments, setComments] = useState<ICommentItem[]>([])

    const [isCommentsLoading, setIsCommentsLoading] = useState<boolean>(false)

    const [isCommentsError, setIsCommentsError] = useState<boolean>(false)

    // Получаем список комментариев по id из параметров
    const commentsCallback = useFetching(async () => {
        if (props.postId) {
            setIsCommentsLoading(true)
            PostService.getCommentsById(props.postId)
                .then(
                    (response: ICommentItem[]) => {
                        setComments(response)
                    },
                    () => {
                        setIsCommentsError(true)
                    }
                )
                .finally(() => setIsCommentsLoading(false))
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
                <div>Ошибка загрузки комментариев</div>
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
