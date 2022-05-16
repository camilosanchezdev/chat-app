import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core'
import { ContactModel } from 'src/app/common/models/contact.model'
import { UserModel } from 'src/app/common/models/user.model'

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit, OnChanges {
    @Input() contact: UserModel
    @Input() receiver: UserModel
    @Input() unreadMessages: any
    isSelected: boolean = false
    hasUnreadMessages: boolean = false
    constructor() {}
    ngOnChanges(changes: SimpleChanges): void {
        if (changes.unreadMessages && this.unreadMessages) {
            this.hasUnreadMessages = this.unreadMessages.find((message) => message.senderUserId === this.contact.id)
        }
    }

    ngOnInit(): void {}
    selectItem(): void {
        this.isSelected = true
    }
}
