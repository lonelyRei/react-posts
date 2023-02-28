import { PostsThemes, postsThemesArray } from '../types'

export const generateRandomTheme = (): PostsThemes => {
    const rand: number = Math.floor(Math.random() * postsThemesArray.length)
    return postsThemesArray[rand]
}
