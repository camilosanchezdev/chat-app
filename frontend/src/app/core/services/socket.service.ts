import { Injectable } from '@angular/core'
import { AuthService } from './auth.service'
import { WebSocketSubject, webSocket } from 'rxjs/webSocket'
import { environment } from 'src/environments/environment'
import { Store } from '@ngrx/store'
import { AuthState } from '../state/app.state'
import { mergeMap, retry, retryWhen } from 'rxjs/operators'
import { Observable, of } from 'rxjs'
import * as io from 'socket.io-client'
@Injectable({
    providedIn: 'root',
})
export class SocketService {
    private socket
    constructor(private authService: AuthService, private store: Store<AuthState>) {}
    sendMessage(message): void {
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
}
