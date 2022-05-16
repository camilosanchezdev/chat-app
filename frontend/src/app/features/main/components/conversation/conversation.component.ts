import { AfterViewChecked, Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { EMPTY, Subscription } from 'rxjs'
import { switchMap } from 'rxjs/operators'
import { MessageInputModel } from 'src/app/common/models/message-input.model'
import { MessageModel } from 'src/app/common/models/message.model'
import { UserModel } from 'src/app/common/models/user.model'
import { SendMessageRequest } from 'src/app/common/requests/send-message.request'
import { UserService } from 'src/app/common/services/user.service'
import { SocketService } from 'src/app/core/services/socket.service'

@Component({
    selector: 'app-conversation',
    templateUrl: './conversation.component.html',
    styleUrls: ['./conversation.component.css'],
})
export class ConversationComponent implements OnInit, OnDestroy, AfterViewChecked, OnChanges {
    @ViewChild('scrollMe') private myScrollContainer: ElementRef
    private subscriptions = new Subscription()
    @Input() conversation: Array<MessageInputModel>
    receiver: UserModel
    usernameLoggedId: number
    formGroup: FormGroup
    avatarUrl: string
    isContact: boolean = false
    userId: number
    constructor(private formBuilder: FormBuilder, private userService: UserService, private socketService: SocketService) {
        this.formGroup = this.formBuilder.group({
            message: [null],
        })
    }
    ngOnChanges(changes: SimpleChanges): void {
        if (this.receiver) {
            this.avatarUrl = '/assets/avatars/' + this.receiver?.avatar + '.png'
        }
    }
    ngAfterViewChecked(): void {
        this.scrollToBottom()
    }
    scrollToBottom(): void {
        try {
            this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight
        } catch (err) {}
    }
    ngOnDestroy(): void {
        this.subscriptions.unsubscribe()
    }
    markAsRead(senderId: number): void {
        this.subscriptions.add(this.userService.markAsRead(senderId).subscribe())
    }
    ngOnInit(): void {
        this.subscriptions.add(
            this.userService.getUserLoggedId().subscribe((x) => {
                // TODO quitar
                this.usernameLoggedId = x
            })
        )
        this.subscriptions.add(
            this.socketService.getMessages().subscribe((message: MessageInputModel) => {
                if (
                    (message.receiverId == this.receiver.id && message.senderId === this.usernameLoggedId) ||
                    (message.receiverId === this.usernameLoggedId && message.senderId === this.receiver.id)
                ) {
                    this.conversation.push(message)
                    this.markAsRead(this.receiver.id)
                    this.scrollToBottom()
                }
            })
        )

        this.subscriptions.add(
            this.userService
                .getCurrentReceiver()
                .pipe(
                    switchMap((receiver) => {
                        if (receiver) {
                            this.receiver = receiver
                            return this.userService.getCurrentContacts()
                        } else {
                            return EMPTY
                        }
                    })
                )
                .subscribe((contacts) => {
                    if (contacts && this.receiver) {
                        this.isContact = contacts.some((x) => x.id === this.receiver.id)
                    }
                })
        )
    }
    onSubmit(formGroup: FormGroup): void {
        const message: SendMessageRequest = { receiverId: this.receiver.id, message: formGroup.controls.message.value }
        this.subscriptions.add(this.userService.sendMessage(message).subscribe())
        const newMessage: MessageInputModel = {
            id: 0,
            date: new Date(),
            message: formGroup.controls.message.value,
            receiverId: this.receiver.id,
            senderId: this.usernameLoggedId,
        }
        this.socketService.sendMessage(newMessage)
        this.formGroup.controls.message.setValue(null)
    }
    addContact(contactId): void {
        this.subscriptions.add(this.userService.addContact(contactId).subscribe())
        this.isContact = true
    }
    removeContact(contactId): void {
        this.subscriptions.add(
            this.userService
                .removeContact(contactId)
                .pipe(
                    switchMap(() => {
                        return this.userService.getContacts()
                    })
                )
                .subscribe()
        )
        this.isContact = false
    }
}
