import { Component, OnDestroy, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'
import { ContactModel } from 'src/app/common/models/contact.model'
import { UserService } from 'src/app/common/services/user.service'

@Component({
    selector: 'app-contacts',
    templateUrl: './contacts.component.html',
    styleUrls: ['./contacts.component.css'],
})
export class ContactsComponent implements OnInit, OnDestroy {
    subscriptions = new Subscription()
    contacts: Array<ContactModel>
    constructor(private userService: UserService) {}
    ngOnDestroy(): void {
        this.subscriptions.unsubscribe()
    }

    ngOnInit(): void {
        this.subscriptions.add(this.userService.getContacts().subscribe((contacts) => (this.contacts = contacts)))
    }
}
