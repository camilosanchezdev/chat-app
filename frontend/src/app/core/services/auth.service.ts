import { Injectable } from '@angular/core'
import { UserApi } from 'src/app/common/api/user.api'
import { SignCredentials } from '../requests/signin-credentials'
import { select, Store } from '@ngrx/store'
import { AuthState } from '../state/app.state'
import { map } from 'rxjs/operators'
import { LoginAction, LogoutAction, RegisterAction } from '../state/actions/auth.action'
import { Observable } from 'rxjs'
import { Router } from '@angular/router'
@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(private userApi: UserApi, private store: Store<AuthState>, private router: Router) {}

    signIn(signInCredentials: SignCredentials) {
        return this.userApi.signIn(signInCredentials).pipe(
            map((response) => {
                this.store.dispatch(
                    new LoginAction({
                        token: response.accessToken,
                    })
                )
            })
        )
    }
    logout() {
        return this.store.dispatch(new LogoutAction())
    }
    signUp(signUpCredentials: SignCredentials) {
        return this.userApi.signUp(signUpCredentials).pipe(
            map((response) => {
                this.store.dispatch(
                    new RegisterAction({
                        token: response.accessToken,
                    })
                )
            })
        )
    }

    isAuth(): Observable<boolean> {
        return this.store.pipe(
            select((x) => x),
            map((x: any) => {
                if (!x.app.isAuthenticated) this.router.navigate(['/user/login'])
                return x.app.isAuthenticated
            })
        )
    }
    isAuthUser(): Observable<boolean> {
        return this.store.pipe(
            select((x) => x),
            map((x: any) => {
                if (x.app.isAuthenticated) this.router.navigate(['/'])
                return !x.app.isAuthenticated
            })
        )
    }
}
