import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'
import { MessageModel } from '../models/message.model'
import { SendMessageRequest } from '../requests/send-message.request'

@Injectable({
    providedIn: 'root',
})
export class MessageApi {
    apiEndpoint: 'messages'
    constructor(private http: HttpClient) {}

    getConversation(userId): Observable<any> {
        return this.http.get(`${environment.apiUrl}/messages/${userId}`)
    }

    sendMessage(sendMessageRequest: SendMessageRequest): Observable<MessageModel> {
        return this.http.post<MessageModel>(`${environment.apiUrl}/messages/`, sendMessageRequest)
    }
}
