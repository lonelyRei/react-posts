import React from 'react'
import './commentItem.css'

export const CommentItem: React.FC<ICommentItemProps> = (props: ICommentItemProps): JSX.Element => {
    return (
        <div className="comment__item">
            <div className="comment__item-header">
                <span className="comment__item-position">{props.position}. </span>
                <span className="comment__item-name">{props.name}</span>
            </div>
            <div className="comment__item-body">{props.body}</div>
        </div>
    )
}

interface ICommentItemProps {
    position: number
    name: string
    body: string
}
