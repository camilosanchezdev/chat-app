import { Component, Input, OnDestroy, OnInit } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { Subscription } from 'rxjs'
import { MessageModel } from 'src/app/common/models/message.model'
import { UserModel } from 'src/app/common/models/user.model'
import { SendMessageRequest } from 'src/app/common/requests/send-message.request'
import { UserService } from 'src/app/common/services/user.service'

@Component({
    selector: 'app-conversation',
    templateUrl: './conversation.component.html',
    styleUrls: ['./conversation.component.css'],
})
export class ConversationComponent implements OnInit, OnDestroy {
    private subscriptions = new Subscription()
    @Input() conversation: Array<MessageModel>
    @Input() receiver: UserModel
    usernameLoggedId: number
    formGroup: FormGroup
    constructor(private formBuilder: FormBuilder, private userService: UserService) {
        this.formGroup = this.formBuilder.group({
            message: [null],
        })
    }
    ngOnDestroy(): void {
        this.subscriptions.unsubscribe()
    }

    ngOnInit(): void {
        this.subscriptions.add(
            this.userService.getUserLogged().subscribe((x) => {
                console.log(x.app.userId)
                this.usernameLoggedId = x.app.userId
            })
        )
    }
    onSubmit(formGroup: FormGroup): void {
        const message: SendMessageRequest = { receiverId: this.receiver.id, message: formGroup.controls.message.value }
        this.subscriptions.add(this.userService.sendMessage(message).subscribe(console.log))
        this.formGroup.controls.message.setValue(null)
    }
}
