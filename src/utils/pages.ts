export const getPagesCount = (totalCount: number, limit: number): number => {
    return Math.ceil(totalCount / limit)
}

export const getPagesArray = (totalPages: number): number[] => {
    const result: number[] = []
    for (let i: number = 0; i < totalPages; i++) {
        result.push(i + 1)
    }
    return result
}
