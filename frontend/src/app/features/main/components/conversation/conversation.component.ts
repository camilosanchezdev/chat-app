import { Component, Input, OnInit } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { MessageModel } from 'src/app/common/models/message.model'

@Component({
    selector: 'app-conversation',
    templateUrl: './conversation.component.html',
    styleUrls: ['./conversation.component.css'],
})
export class ConversationComponent implements OnInit {
    @Input() conversation: Array<MessageModel>
    @Input() receiver: string
    formGroup: FormGroup
    constructor(private formBuilder: FormBuilder) {
        this.formGroup = this.formBuilder.group({
            message: [null],
        })
    }

    ngOnInit(): void {}
    onSubmit(formGroup: FormGroup): void {
        this.conversation.push({
            id: 0,
            date: new Date(),
            message: formGroup.controls.message.value,
            receiver: { id: 1, username: 'test' },
            sender: { id: 2, username: 'admin' },
        })
        this.formGroup.controls.message.setValue(null)
        console.log(this.conversation)
    }
}
