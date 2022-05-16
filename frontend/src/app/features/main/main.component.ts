import { Component, HostListener, OnDestroy, OnInit } from '@angular/core'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { EMPTY, Subscription } from 'rxjs'
import { switchMap } from 'rxjs/operators'
import { MessageInputModel } from 'src/app/common/models/message-input.model'
import { MessageModel } from 'src/app/common/models/message.model'
import { UserModel } from 'src/app/common/models/user.model'
import { UserService } from 'src/app/common/services/user.service'
import { AuthService } from 'src/app/core/services/auth.service'
import { SocketService } from 'src/app/core/services/socket.service'
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component'

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit, OnDestroy {
    private subscriptions = new Subscription()
    messages: Array<MessageModel>
    currentReceiver: UserModel
    usernameLoggedId: number
    conversation: Array<MessageInputModel>
    constructor(private authService: AuthService, private modalService: NgbModal, private userService: UserService, private socketService: SocketService) {}
    async ngOnDestroy() {
        this.subscriptions.unsubscribe()
    }

    ngOnInit(): void {
        this.subscriptions.add(
            this.userService.getUserLoggedId().subscribe((x) => {
                // TODO quitar
                this.usernameLoggedId = x
            })
        )
        this.subscriptions.add(
            this.userService.getCurrentReceiver().subscribe((receiverUser: UserModel) => {
                // TODO quitar
                if (receiverUser) this.currentReceiver = receiverUser
            })
        )
        this.subscriptions.add(
            this.socketService.getMessages().subscribe((message: MessageInputModel) => {
                if (message.receiverId === this.usernameLoggedId && message.senderId !== this.currentReceiver?.id) {
                    this.userService.setUnreadMessages({ senderUserId: message.senderId, senderUserName: '' })
                }
            })
        )
        this.subscriptions.add(
            this.userService
                .getCurrentReceiver()
                .pipe(
                    switchMap((user) => {
                        if (user) {
                            return this.userService.getConversation(user.id)
                        } else {
                            return EMPTY
                        }
                    })
                )
                .subscribe((messages) => {
                    this.messages = messages
                    this.conversation = this.messages.map(
                        (message): MessageInputModel => ({
                            id: message.id,
                            date: message.date,
                            message: message.message,
                            receiverId: message.receiver.id,
                            senderId: message.sender.id,
                        })
                    )
                })
        )
    }
    logout(): void {
        this.subscriptions.add(
            this.modalService.open(ConfirmationModalComponent, { centered: true, size: 'l' }).closed.subscribe((value) => {
                if (value) {
                    // this.authService.logout().subscribe()
                }
            })
        )
    }
}
