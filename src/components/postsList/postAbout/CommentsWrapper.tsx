import React from 'react'
import { CommentsList } from '../commentsList/CommentsList'
import { CustomButton } from '../../UI/button/CustomButton'

export const CommentsWrapper: React.FC<ICommentsWrapperProps> = (props: ICommentsWrapperProps): JSX.Element => {
    if (props.isNeedComments) {
        return (
            <>
                <CommentsList postId={props.id ? props.id : '0'} />
                <CustomButton
                    placeholder="Скрыть комментарии"
                    onSubmit={() => {
                        props.setIsNeedComments(false)
                    }}
                />
            </>
        )
    } else {
        return (
            <CustomButton
                placeholder="Загрузить комментарии"
                onSubmit={() => {
                    props.setIsNeedComments(true)
                }}
            />
        )
    }
}

interface ICommentsWrapperProps {
    isNeedComments: boolean // Флаг открытости окна с комментариями
    setIsNeedComments: (value: boolean) => void // Скрывает / Показывает поле с комментариями
    id: string // Идентификатор поста
}
