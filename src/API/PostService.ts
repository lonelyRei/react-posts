import axios, { AxiosResponse } from 'axios'
import { IPostsListItem, PostsThemes } from '../types'
export default class PostService {
    // URL для получения всех постов
    private static postsUrl: string = 'https://jsonplaceholder.typicode.com/posts'

    // Статичная функция для получения всех постов
    public static getAllPosts(): Promise<IPostsListItem[]> {
        return axios.get(PostService.postsUrl).then(
            (response: AxiosResponse<any>) => {
                const data: postsResponse[] = response.data
                const correctData: IPostsListItem[] = []
                data.forEach((post: postsResponse) => {
                    correctData.push({ title: post.title, content: post.body, theme: PostsThemes.other, id: post.id })
                })
                return correctData
            },
            (e: any) => {
                throw new Error(e.message)
            }
        )
    }
}

// Интерфейс данных, приходящих в качестве ответа от сервера
interface postsResponse {
    userId: number
    id: number
    title: string
    body: string
}
