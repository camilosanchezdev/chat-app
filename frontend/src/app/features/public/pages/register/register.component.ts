import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { confirmPassValidator } from 'src/app/common/directives/confirm-pass.directive'

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
    formGroup: FormGroup
    submitted: boolean = false
    constructor(private formBuilder: FormBuilder) {
        this.formGroup = this.formBuilder.group(
            {
                username: [null, Validators.required],
                password: [null, Validators.required],
                confirmPassword: [null, [Validators.required]],
            },
            { validators: confirmPassValidator }
        )
    }

    ngOnInit(): void {}
    onSubmit(form: FormGroup): void {
        this.submitted = true
        console.log(form)

        if (form.valid) {
            console.log({
                username: form.controls.username.value,
                password: form.controls.password.value,
            })
        }
    }
}
