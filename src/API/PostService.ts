import axios, { AxiosResponse } from 'axios'
import { ICommentItem, IPostsListItem } from '../types'
import { generateRandomTheme } from '../utils/themes'
export default class PostService {
    // URL для получения всех постов
    private static postsUrl: string = 'https://jsonplaceholder.typicode.com/posts'
    private static commentsUrl: string = 'https://jsonplaceholder.typicode.com/comments'

    // Преобразует пост из ответа с сервера (имеет неверный формат) в пост типа IPostsListItem
    private static getCorrectPost(post: postsResponse, theme: string): IPostsListItem {
        return {
            title: post.title,
            content: post.body,
            theme: theme,
            id: post.id,
        }
    }

    // Преобразует комментарий из ответа с сервера в комментарий типа ICommentItem
    private static getCorrectComment(comment: commentsResponse): ICommentItem {
        return {
            name: comment.name,
            id: comment.id,
            body: comment.body,
        }
    }

    // Статичная функция для получения всех постов
    public static getAllPosts(limit: number = 10, page: number = 1): Promise<allPostsResponse> {
        return new Promise((resolve, reject) => {
            axios
                .get<postsResponse[]>(PostService.postsUrl, {
                    params: {
                        _limit: limit, // Максимум постов в ответе
                        _page: page, // Номер страницы
                    },
                })
                .then((response: AxiosResponse<postsResponse[]>) => {
                    // Вытаскиваем данные
                    const data: postsResponse[] = response.data
                    // Создаем список постов (пока что пустой)
                    const correctData: IPostsListItem[] = []
                    // Наполняем список корректными постами
                    data.forEach((post: postsResponse) => {
                        // Формируем корректный пост и пушим его в массив
                        // тему генерируем случайно (в теле ответа ее нет)
                        correctData.push(this.getCorrectPost(post, generateRandomTheme()))
                    })
                    // Возвращаем массив корректных постом и количество постов, доступных для отрисовки
                    resolve({ correctData: correctData, totalCount: Number(response.headers['x-total-count']) })
                })
                .catch(() => {
                    reject(new Error('Не удалось загрузить посты'))
                })
        })
    }

    // Возвращает пост по id
    public static getPost(id: string): Promise<IPostsListItem> {
        return new Promise((resolve, reject) => {
            axios
                .get<postsResponse>(PostService.postsUrl + `/${id}`)
                .then((response: AxiosResponse<postsResponse>) => {
                    // Вытаскивает данные
                    const data: postsResponse = response.data
                    // Формируем корректный пост, тему генерируем случайно (в теле ответа ее нет)
                    resolve(this.getCorrectPost(data, generateRandomTheme()))
                })
                .catch((error) => {
                    reject(new Error(error))
                })
        })
    }

    // Возращает список комментариев, соответствующих id поста
    public static getCommentsById(postId: string): Promise<ICommentItem[]> {
        return new Promise((resolve, reject) => {
            axios
                .get<commentsResponse[]>(PostService.commentsUrl, {
                    params: {
                        postId: postId,
                    },
                })
                .then((response: AxiosResponse<commentsResponse[]>) => {
                    const data: commentsResponse[] = response.data
                    const result: ICommentItem[] = []
                    data.forEach((comment: commentsResponse): void => {
                        result.push(this.getCorrectComment(comment))
                    })
                    resolve(result)
                })
                .catch((error) => {
                    reject(error)
                })
        })
    }
}

// Интерфейс полезной нагрузки, приходящей в теле ответа при запросе списка постов
interface postsResponse {
    userId: number // Идентификатор пользователя
    id: number // Идентификатор поста
    title: string // Заголовок поста
    body: string // тело поста
}

// Интерфейс полезной нагрузки, приходящей в теле ответа при запросе комментариев
interface commentsResponse {
    id: number // Идентификатор комментария
    postId: number // Идентификатор поста, к которому написан комментарий
    name: string // Имя пользователя
    email: string // Email пользователя
    body: string // Тело комментария
}

export interface allPostsResponse {
    correctData: IPostsListItem[]
    totalCount: number
}
