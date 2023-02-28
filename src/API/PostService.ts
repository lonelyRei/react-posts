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
    public static getAllPosts(limit: number = 10, page: number = 1): Promise<[IPostsListItem[], number]> {
        return axios
            .get(PostService.postsUrl, {
                params: {
                    _limit: limit, // Максимум постов в ответе
                    _page: page, // Номер страницы
                },
            })
            .then(
                (response: AxiosResponse<any>) => {
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
                    return [correctData, Number(response.headers['x-total-count'])]
                },
                (e: any) => {
                    // Если что-то пошло не так, то просто генерируем ошибку
                    throw new Error(e.message)
                }
            )
    }

    // Возвращает пост по id
    public static getPost(id: string): Promise<IPostsListItem> {
        return axios.get(PostService.postsUrl + `/${id}`).then(
            (response: AxiosResponse<any>) => {
                // Вытаскивает данные
                const data: postsResponse = response.data
                // Формируем корректный пост, тему генерируем случайно (в теле ответа ее нет)
                return this.getCorrectPost(data, generateRandomTheme())
            },
            (e: any) => {
                // Выкидываем ошибку, если что-то пошло не так
                throw new Error(e.message)
            }
        )
    }

    // Возращает список комментариев, соответствующих id поста
    public static getCommentsById(postId: string) {
        return axios
            .get(PostService.commentsUrl, {
                params: {
                    postId: postId,
                },
            })
            .then(
                (response: AxiosResponse<any>) => {
                    const data: commentsResponse[] = response.data
                    const result: ICommentItem[] = []
                    data.forEach((comment: commentsResponse): void => {
                        result.push(this.getCorrectComment(comment))
                    })
                    return result
                },
                (e: any) => {
                    // Выкидываем ошибку, если что-то пошло не так
                    throw new Error(e.message)
                }
            )
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
