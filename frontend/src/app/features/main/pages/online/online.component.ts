import { Component, OnDestroy, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'
import { ContactModel } from 'src/app/common/models/contact.model'
import { MessageModel } from 'src/app/common/models/message.model'
import { UserModel } from 'src/app/common/models/user.model'
import { UserService } from 'src/app/common/services/user.service'

@Component({
    selector: 'app-online',
    templateUrl: './online.component.html',
    styleUrls: ['./online.component.css'],
})
export class OnlineComponent implements OnInit, OnDestroy {
    private subscriptions = new Subscription()
    receiver: UserModel
    messages: Array<MessageModel>
    usersOnline: Array<UserModel>
    constructor(private userService: UserService) {}
    ngOnDestroy(): void {
        this.subscriptions.unsubscribe()
    }

    ngOnInit(): void {
        this.subscriptions.add(
            this.userService.getAllUsers().subscribe((usersOnline) => {
                this.usersOnline = usersOnline
                if (usersOnline.length > 0) {
                    this.openConversation(this.usersOnline[0])
                }
            })
        )
    }

    openConversation(contact: UserModel): void {
        this.receiver = contact
        this.userService.setCurrentReceiver(contact)
    }
}
