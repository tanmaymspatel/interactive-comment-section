export interface ICommentsDetails {
    id: number,
    content: string,
    commentingDate: string,
    upvotes: number,
    userName: string,
    isCurrentUSer: boolean,
    replies: ICommentsDetails[]
}