import { useState } from 'react'

// Кастомный хук для отправки запроса на сервер
// Запускает спиннер и вызывает асинхронный callback
export const useFetching = (callback: any) => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    const fetching = async () => {
        try {
            setIsLoading(true)
            await callback()
        } catch (e: any) {
            setError(e.message)
        } finally {
            setIsLoading(false)
        }
    }

    return [fetching, isLoading, error]
}
