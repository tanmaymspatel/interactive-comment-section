export interface ICommentsDetails {
    id: number,
    content: string,
    commentingDate: string,
    upvotes: number,
    voted?: boolean,
    userName: string,
    profilePicture: string,
    isCurrentUSer: boolean,
    replies: ICommentsDetails[]
}