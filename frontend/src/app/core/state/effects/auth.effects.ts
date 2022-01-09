import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { Action } from '@ngrx/store'
import { EMPTY, Observable, of } from 'rxjs'
import { map, switchMap, tap } from 'rxjs/operators'
import * as fromAuthActions from './../actions/auth.action'
import { AuthActionTypes, ClearAuthDataAction, GetComplete, LoginAction, LogoutAction, RegisterAction } from './../actions/auth.action'
@Injectable()
export class AuthEffects {
    constructor(private actions$: Actions, private router: Router) {}

    init$: Observable<Action> = createEffect(() => {
        const auth = localStorage.getItem('chatapp')
        if (auth) {
            const credentials = JSON.parse(auth)
            return of(new fromAuthActions.SetAuthDataAction(credentials))
        } else {
            return EMPTY
        }
    })

    loginAction$: Observable<Action> = createEffect(() =>
        this.actions$.pipe(
            ofType(fromAuthActions.AuthActionTypes.Login),
            map((action) => <fromAuthActions.LoginAction>action),
            tap((action) => {
                const auth = {
                    isAuthenticated: true,
                    token: action.payload.token,
                    username: action.payload.username,
                }

                localStorage.setItem('chatapp', JSON.stringify(auth))

                this.router.navigate(['/'])
            }),
            switchMap(() => {
                return of(new GetComplete(1))
            })
        )
    )

    logoutAction$: Observable<Action> = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActionTypes.Logout),
            map((action) => <LogoutAction>action),
            switchMap(() => {
                localStorage.removeItem('chatapp')
                this.router.navigate(['/user/login'])
                return of(new ClearAuthDataAction())
            })
        )
    )
    registerAction$: Observable<Action> = createEffect(
        () =>
            this.actions$.pipe(
                ofType(fromAuthActions.AuthActionTypes.Register),
                map((action) => <fromAuthActions.RegisterAction>action),
                tap((action) => {
                    const auth = {
                        isAuthenticated: true,
                        token: action.payload.token,
                    }
                    localStorage.setItem('chatapp', JSON.stringify(auth))
                    this.router.navigate(['/'])
                })
            ),
        { dispatch: false }
    )
}
