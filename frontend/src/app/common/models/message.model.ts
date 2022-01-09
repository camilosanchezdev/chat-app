export interface MessageModel {
    id: number
    date: Date
    message: string
    receiver: { id: number; username: string }
    sender: { id: number; username: string }
}
