import { Injectable } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { map, tap } from 'rxjs/operators'
import { SocketService } from 'src/app/core/services/socket.service'
import {
    GetComplete,
    RemoveMessageUnreadAction,
    SetAvatar,
    SetCurrentReceiverAction,
    SetOnlineUsers,
    SetUnreadMessagesAction,
} from 'src/app/core/state/actions/auth.action'
import { AuthState } from 'src/app/core/state/app.state'
import { getContacts, getCurrentReceiver, getOnlineUsers, getUnreadMessages, getUserId } from 'src/app/core/state/selectors/auth.selector'
import { ContactApi } from '../api/contact.api'
import { MessageApi } from '../api/message.api'
import { StatusApi } from '../api/status.api'
import { UserApi } from '../api/user.api'
import { MessageModel } from '../models/message.model'
import { UserModel } from '../models/user.model'
import { ChangeAvatarRequest } from '../requests/change-avatar.request'
import { SendMessageRequest } from '../requests/send-message.request'

@Injectable({
    providedIn: 'root',
})
export class UserService {
    constructor(
        private contactApi: ContactApi,
        private messageApi: MessageApi,
        private store: Store<AuthState>,
        private userApi: UserApi,
        private statusApi: StatusApi,
        private socketService: SocketService
    ) {}

    getContacts(): Observable<any> {
        return this.contactApi.getContacts().pipe(
            map((response) => {
                this.store.dispatch(new GetComplete(response))
                return response
            })
        )
    }
    getAllUsers(): Observable<any> {
        return this.userApi.getAllUsers().pipe(
            tap((users) => {
                this.store.dispatch(new SetOnlineUsers(users))
            })
        )
    }
    getOnlineUsers(): Observable<any> {
        return this.store.select(getOnlineUsers())
    }
    setOnlineUsers(users: UserModel[]) {
        return this.store.dispatch(new SetOnlineUsers(users))
    }
    getConversation(userId: number): Observable<any> {
        return this.messageApi.getConversation(userId)
    }
    sendMessage(sendMessageRequest: SendMessageRequest): Observable<MessageModel> {
        return this.messageApi.sendMessage(sendMessageRequest)
    }
    getUserLogged(): Observable<any> {
        return this.store.select((state) => state)
    }
    getUserLoggedId(): Observable<any> {
        return this.store.select(getUserId())
    }
    getStatuses(): Observable<any> {
        return this.statusApi.getAll()
    }
    changeAvatar(changeAvatarRequest: ChangeAvatarRequest): Observable<any> {
        return this.userApi.changeAvatar(changeAvatarRequest).pipe(
            map((response) => {
                this.store.dispatch(new SetAvatar(response))
                return response
            })
        )
    }
    addContact(contactId: number): Observable<any> {
        return this.contactApi.addContact(contactId)
    }
    removeContact(contactId: number): Observable<any> {
        return this.contactApi.removeContact(contactId)
    }
    getCurrentReceiver(): Observable<UserModel> {
        return this.store.select(getCurrentReceiver())
    }
    setCurrentReceiver(user: UserModel): void {
        this.store.dispatch(new SetCurrentReceiverAction(user))
    }
    getCurrentContacts(): Observable<any> {
        return this.store.select(getContacts())
    }
    setUserStatus(userId: number, isOnline: boolean) {
        return this.socketService.sendOnlineUser(userId, isOnline)
    }
    getOnline(): Observable<any> {
        return this.socketService.getOnline()
    }
    setUnreadMessages(newMessage: { senderUserId: number; senderUserName: string }) {
        return this.store.dispatch(new SetUnreadMessagesAction(newMessage))
    }
    getUnreadMessages() {
        return this.store.select(getUnreadMessages())
    }
    removeMessageUnread(userId: number) {
        return this.store.dispatch(new RemoveMessageUnreadAction(userId))
    }
    markAsRead(messageId: number): Observable<any> {
        return this.messageApi.markAsRead(messageId)
    }
}
