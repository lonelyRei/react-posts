import React from 'react'
import { IPostsListItem } from '../../../types'
import './postItem.css'
import { CustomButton } from '../../UI/button/CustomButton'

export const PostItem: React.FC<IPostItemProps> = (props: IPostItemProps): JSX.Element => {
    return (
        <div className="postItem">
            <span className="postItemTheme">Тема: {props.theme}</span> <br />
            <div className="postItemTop">
                <span className="postItemPosition">{props.position}.</span>
                <span className="postItemTitle">{props.title}</span>
            </div>
            <div className="postItemBottom">
                <p className="postItemContent">{props.content}</p>
                <CustomButton placeholder="Удалить" onSubmit={(): void => props.removePost(props.id)} />
            </div>
        </div>
    )
}

interface IPostItemProps extends IPostsListItem {
    position: number // Порядковый номер поста для корректного отображения в списке (начиная с единицы)
    removePost: (id: number) => void // Callback удаления поста
}
