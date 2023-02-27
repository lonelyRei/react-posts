import axios, { AxiosResponse } from 'axios'
import { IPostsListItem, PostsThemes } from '../types'
export default class PostService {
    // URL для получения всех постов
    private static postsUrl: string = 'https://jsonplaceholder.typicode.com/posts'

    // Статичная функция для получения всех постов
    public static getAllPosts(limit: number = 10, page: number = 1): Promise<[IPostsListItem[], number]> {
        return axios
            .get(PostService.postsUrl, {
                params: {
                    _limit: limit,
                    _page: page,
                },
            })
            .then(
                (response: AxiosResponse<any>) => {
                    const data: postsResponse[] = response.data
                    const correctData: IPostsListItem[] = []
                    data.forEach((post: postsResponse) => {
                        correctData.push({
                            title: post.title,
                            content: post.body,
                            theme: PostsThemes.other,
                            id: post.id,
                        })
                    })
                    return [correctData, Number(response.headers['x-total-count'])]
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
