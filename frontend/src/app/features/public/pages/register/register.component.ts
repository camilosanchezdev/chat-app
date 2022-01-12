import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Subscription } from 'rxjs'
import { confirmPassValidator } from 'src/app/common/directives/confirm-pass.directive'
import { AuthService } from 'src/app/core/services/auth.service'

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit, OnDestroy {
    subscriptions = new Subscription()
    formGroup: FormGroup
    submitted: boolean = false
    constructor(private formBuilder: FormBuilder, private authService: AuthService) {
        this.formGroup = this.formBuilder.group(
            {
                username: [null, Validators.required],
                password: [null, Validators.required],
                confirmPassword: [null, [Validators.required]],
            },
            { validators: confirmPassValidator }
        )
    }
    ngOnDestroy(): void {
        this.subscriptions.unsubscribe()
    }

    ngOnInit(): void {}
    onSubmit(form: FormGroup): void {
        this.submitted = true

        if (form.valid) {
            this.subscriptions.add(
                this.authService
                    .signUp({
                        username: form.controls.username.value,
                        password: form.controls.password.value,
                    })
                    .subscribe()
            )
        }
    }
}
