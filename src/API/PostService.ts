import axios, { AxiosResponse } from 'axios'
import { IPostsListItem, PostsThemes } from '../types'
export default class PostService {
    // URL для получения всех постов
    private static postsUrl: string = 'https://jsonplaceholder.typicode.com/posts'

    // Преобразует пост из ответа с сервера (имеет неверный формат) в пост типа IPostsListItem
    private static getCorrectPost(post: postsResponse, theme: string): IPostsListItem {
        return {
            title: post.title,
            content: post.body,
            theme: theme,
            id: post.id,
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
                        correctData.push(this.getCorrectPost(post, PostsThemes.other))
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
                // Формируем корректный пост, тему задаем хардкодом (на сервере нет такого поля)
                return this.getCorrectPost(data, PostsThemes.other)
            },
            (e: any) => {
                // Выкидываем ошибку, если что-то пошло не так
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
