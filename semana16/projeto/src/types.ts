export type User = {
    id: string,
    name: string,
    nickname: string,
    email: string
}

export type Task = {
    id: string,
    title: string,
    description: string,
    limit_date: string,
    creator_user_id: string
}

export enum StatusEnum { 'to_do', 'doing', 'done' }