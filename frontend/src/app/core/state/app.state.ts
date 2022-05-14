import { ContactModel } from 'src/app/common/models/contact.model'
import { UserModel } from 'src/app/common/models/user.model'

export interface AuthState {
    isAuthenticated: boolean
    token: string
    username: string
    userId: number
    statusId: number
    avatarId: number
    contacts?: ContactModel[]
    currentReceiver?: UserModel
    onlineUsers?: UserModel[]
}
