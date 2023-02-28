import React from 'react'
import { IPostsListItem } from '../../../types'
import './postItem.css'
import { CustomButton } from '../../UI/button/CustomButton'
import { NavigateFunction, useNavigate } from 'react-router-dom'

export const PostItem: React.FC<IPostItemProps> = (props: IPostItemProps): JSX.Element => {
    const navigate: NavigateFunction = useNavigate()
    return (
        <div className="postItem">
            <span className="postItemTheme">Тема: {props.theme}</span> <br />
            <div className="postItemTop">
                <span className="postItemPosition">{props.position}.</span>
                <span className="postItemTitle">{props.title}</span>
            </div>
            <div className="postItemBottom">
                <p className="postItemContent">{props.content}</p>
                <div className="postItemOptions">
                    <CustomButton placeholder="Открыть" onSubmit={(): void => navigate(`/posts/${props.id}`)} />
                    <CustomButton placeholder="Удалить" onSubmit={(): void => props.removePost(props.id)} />
                </div>
            </div>
        </div>
    )
}

interface IPostItemProps extends IPostsListItem {
    position: number // Порядковый номер поста для корректного отображения в списке (начиная с единицы)
    removePost: (id: number) => void // Callback удаления поста
}
