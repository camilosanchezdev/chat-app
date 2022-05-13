import { AfterViewChecked, Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { EMPTY, Subscription } from 'rxjs'
import { switchMap } from 'rxjs/operators'
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
    @Input() conversation: Array<MessageModel>
    receiver: UserModel
    usernameLoggedId: number
    formGroup: FormGroup
    avatarUrl: string
    isContact: boolean = false
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

    ngOnInit(): void {
        this.subscriptions.add(
            this.userService.getUserLogged().subscribe((x) => {
                this.usernameLoggedId = x.app.userId
            })
        )
        this.subscriptions.add(
            this.socketService.getMessages().subscribe((message: MessageModel) => {
                this.conversation.push(message)
                this.scrollToBottom()
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
        const newMessage: MessageModel = { id: 0, date: new Date(), message: formGroup.controls.message.value, receiver: this.receiver, sender: null }
        this.socketService.sendMessage(newMessage)
        this.formGroup.controls.message.setValue(null)
    }
    addContact(contactId): void {
        this.subscriptions.add(this.userService.addContact(contactId).subscribe(console.log))
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
                .subscribe(console.log)
        )
        this.isContact = false
    }
}
