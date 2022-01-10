import { Injectable } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { GetComplete } from 'src/app/core/state/actions/auth.action'
import { AuthState } from 'src/app/core/state/app.state'
import { ContactApi } from '../api/contact.api'
import { MessageApi } from '../api/message.api'
import { UserApi } from '../api/user.api'
import { MessageModel } from '../models/message.model'
import { SendMessageRequest } from '../requests/send-message.request'

@Injectable({
    providedIn: 'root',
})
export class UserService {
    constructor(private contactApi: ContactApi, private messageApi: MessageApi, private store: Store<AuthState>, private userApi: UserApi) {}

    getContacts(): Observable<any> {
        return this.contactApi.getContacts().pipe(
            map((response) => {
                this.store.dispatch(new GetComplete(response))
                return response
            })
        )
    }
    getAllUsers(): Observable<any> {
        return this.userApi.getAllUsers()
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
}
