import { UserModel } from './user.model'

export interface MessageModel {
    id: number
    date: Date
    message: string
    receiver: UserModel
    sender: UserModel
}
