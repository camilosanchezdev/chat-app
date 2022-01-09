import { Component, OnDestroy, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'
import { ContactModel } from 'src/app/common/models/contact.model'
import { MessageModel } from 'src/app/common/models/message.model'
import { UserService } from 'src/app/common/services/user.service'

@Component({
    selector: 'app-contacts',
    templateUrl: './contacts.component.html',
    styleUrls: ['./contacts.component.css'],
})
export class ContactsComponent implements OnInit, OnDestroy {
    subscriptions = new Subscription()
    contacts: Array<ContactModel>
    messages: Array<MessageModel>
    receiver: string
    constructor(private userService: UserService) {}
    ngOnDestroy(): void {
        this.subscriptions.unsubscribe()
    }

    ngOnInit(): void {
        this.subscriptions.add(
            this.userService.getContacts().subscribe((contacts) => {
                this.contacts = contacts
                console.log(contacts)
                if (contacts.length > 0) {
                    this.openConversation(this.contacts[0])
                }
            })
        )
    }
    openConversation(contact: ContactModel): void {
        this.receiver = contact.user_contact.username

        this.subscriptions.add(
            this.userService.getConversation(contact.user_contact.id).subscribe((messages) => {
                console.log(messages)
                this.messages = messages
            })
        )
    }
}
