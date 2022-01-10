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
    constructor() {}

    ngOnInit(): void {}
}
