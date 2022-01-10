import { Component, OnDestroy, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'
import { ContactModel } from 'src/app/common/models/contact.model'
import { MessageModel } from 'src/app/common/models/message.model'
import { UserModel } from 'src/app/common/models/user.model'
import { UserService } from 'src/app/common/services/user.service'

@Component({
    selector: 'app-contacts',
    templateUrl: './contacts.component.html',
    styleUrls: ['./contacts.component.css'],
})
export class ContactsComponent implements OnInit, OnDestroy {
    subscriptions = new Subscription()
    contacts: Array<ContactModel>
    contactsAvailables: Array<UserModel>
    messages: Array<MessageModel>
    receiver: UserModel
    constructor(private userService: UserService) {}
    ngOnDestroy(): void {
        this.subscriptions.unsubscribe()
    }

    ngOnInit(): void {
        this.subscriptions.add(
            this.userService.getContacts().subscribe((contacts) => {
                this.contacts = contacts
                this.contactsAvailables = contacts.map((x) => x.user_contact)
                if (contacts.length > 0) {
                    this.openConversation(this.contactsAvailables[0])
                }
            })
        )
    }
    openConversation(contact: UserModel): void {
        this.receiver = contact

        this.subscriptions.add(
            this.userService.getConversation(contact.id).subscribe((messages) => {
                this.messages = messages
            })
        )
    }
}
