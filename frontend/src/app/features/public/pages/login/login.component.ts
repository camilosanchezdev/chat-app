import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AuthService } from 'src/app/core/services/auth.service'

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
    formGroup: FormGroup
    constructor(private formBuilder: FormBuilder, private authService: AuthService) {
        this.formGroup = this.formBuilder.group({
            username: [null, Validators.required],
            password: [null, Validators.required],
        })
    }

    ngOnInit(): void {}
    onSubmit(formGroup: FormGroup): void {
        if (formGroup.valid) {
            this.authService
                .signIn({
                    username: formGroup.controls.username.value,
                    password: formGroup.controls.password.value,
                })
                .subscribe()
        }
    }
}
