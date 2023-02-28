import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { PostsList } from '../postsList/PostsList'
import { PostAbout } from '../postsList/postAbout/PostAbout'

export const Routing: React.FC = (): JSX.Element => {
    return (
        <Routes>
            <Route path="/" element={<div>Стартовая</div>} />
            <Route path="/posts" element={<PostsList />} />
            <Route path="/posts/:id" element={<PostAbout />} />
            <Route path="*" element={<div>Page not found :(</div>} />
        </Routes>
    )
}
