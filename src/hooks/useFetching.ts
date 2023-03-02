// Кастомный хук для отправки запроса на сервер
// Запускает спиннер и вызывает асинхронный callback
export const useFetching = (callback: any) => {
    const fetching = async () => {
        await callback()
    }

    return fetching
}
