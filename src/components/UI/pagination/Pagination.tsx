import React from 'react'
import './pagination.css'

export const Pagination: React.FC<IPaginationProps> = (props: IPaginationProps): JSX.Element => {
    return (
        <div className="postPagination">
            {props.pagesArray.map((num: number): JSX.Element => {
                return (
                    <span
                        onClick={(): void => props.setPage(num)}
                        className={num === props.currentPage ? 'postPag postPagCurrent' : 'postPag'}
                        key={num}
                    >
                        {num}
                    </span>
                )
            })}
        </div>
    )
}

interface IPaginationProps {
    pagesArray: number[]
    currentPage: number
    setPage: (page: number) => void
}
