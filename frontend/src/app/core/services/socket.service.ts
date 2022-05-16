import { Injectable } from '@angular/core'
import { environment } from 'src/environments/environment'
import { Observable } from 'rxjs'
import * as io from 'socket.io-client'
import { MessageModel } from 'src/app/common/models/message.model'
import { MessageInputModel } from 'src/app/common/models/message-input.model'
@Injectable({
    providedIn: 'root',
})
export class SocketService {
    private socket
    private socket2
    constructor() {}
    sendMessage(message: MessageInputModel): void {
        this.socket.emit('message', message)
    }
    getMessages() {
        let observable = new Observable((observer) => {
            this.socket = io.io(environment.socketUrl, { transports: ['websocket'] })
            this.socket.on('message', (data) => {
                observer.next(data)
            })
            return () => {
                this.socket.disconnect()
            }
        })
        return observable
    }
    sendOnlineUser(userId: number, isOnline: boolean): void {
        this.socket2.emit('online', { userId, isOnline })
    }
    getOnline() {
        let observable = new Observable((observer) => {
            this.socket2 = io.io(environment.socketUrl, { transports: ['websocket'] })
            this.socket2.on('online', (data) => {
                observer.next(data)
            })
            return () => {
                this.socket2.disconnect()
            }
        })
        return observable
    }
}
