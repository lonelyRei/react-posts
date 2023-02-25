export enum PostsThemes {
    programming = 'PROGRAMMING',
    sport = 'SPORT',
    news = 'NEWS',
    other = 'OTHER',
}

export interface IPostsListItem {
    title: string
    content: string
    theme: PostsThemes
    id: number
}
