import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'

@Component({
    selector: 'app-conversation',
    templateUrl: './conversation.component.html',
    styleUrls: ['./conversation.component.css'],
})
export class ConversationComponent implements OnInit {
    formGroup: FormGroup
    messages = ['this is the first message']
    constructor(private formBuilder: FormBuilder) {
        this.formGroup = this.formBuilder.group({
            message: [null],
        })
    }

    ngOnInit(): void {}
    onSubmit(formGroup: FormGroup): void {
        this.messages.push(formGroup.controls.message.value)
        this.formGroup.controls.message.setValue(null)
    }
}
