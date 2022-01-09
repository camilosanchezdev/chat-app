import { Component, Input, OnInit } from '@angular/core'
import { ContactModel } from 'src/app/common/models/contact.model'

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
    @Input() contact: ContactModel
    constructor() {}

    ngOnInit(): void {}
}
