import { Injectable } from '@angular/core'
import { UserApi } from 'src/app/common/api/user.api'
import { SignCredentials } from '../requests/signin-credentials'
import { select, Store } from '@ngrx/store'
import { AuthState } from '../state/app.state'
import { map, switchMap, take, tap } from 'rxjs/operators'
import { LoginAction, LogoutAction, RegisterAction } from '../state/actions/auth.action'
import { Observable, of } from 'rxjs'
import { Router } from '@angular/router'
import { getToken, getUserId } from '../state/selectors/auth.selector'
import { SocketService } from './socket.service'
@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(private userApi: UserApi, private store: Store<AuthState>, private router: Router, private socketService: SocketService) {}

    signIn(signInCredentials: SignCredentials) {
        return this.userApi.signIn(signInCredentials).pipe(
            map((response) => {
                this.store.dispatch(
                    new LoginAction({
                        token: response.accessToken,
                        username: response.username,
                        userId: response.id,
                        statusId: response.status,
                        avatarId: response.avatar,
                    })
                )
            })
        )
    }
    logout(userId: number) {
        return this.userApi.logout().pipe(
            switchMap(() => {
                this.socketService.sendOnlineUser(userId, false)
                return of(this.store.dispatch(new LogoutAction()))
            })
        )
    }
    signUp(signUpCredentials: SignCredentials) {
        return this.userApi.signUp(signUpCredentials).pipe(
            map((response) => {
                this.store.dispatch(
                    new RegisterAction({
                        token: response.accessToken,
                        username: response.username,
                        userId: response.id,
                        statusId: response.status,
                        avatarId: response.avatar,
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
    getCurrentToken(): Observable<string> {
        return this.store.pipe(select(getToken()), take(1))
    }
}
