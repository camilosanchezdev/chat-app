import { Component, Input, OnInit } from '@angular/core'
import { ContactModel } from 'src/app/common/models/contact.model'
import { UserModel } from 'src/app/common/models/user.model'

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
    @Input() contact: UserModel
    @Input() receiver: UserModel
    isSelected: boolean = false
    constructor() {}

    ngOnInit(): void {}
    selectItem(): void {
        this.isSelected = true
    }
}
