import { Action } from '@ngrx/store'
import { AuthRequest } from '../../requests/auth.request'
import { AuthState } from '../app.state'

export enum AuthActionTypes {
    SetAuthData = '[Auth] Set Authentication Data',
    Login = '[Auth] Login ',
    Logout = '[Auth] Logout User',
    ClearAuthData = '[Auth] Clear Authentication Data',
    // RefreshToken = '[Auth] Resfresh Token',
    // InitRefreshToken = '[Auth] Init Resfresh Token',
    // SetRefreshedToken = '[Auth] Set Resfreshed Token',
    // InitSetRefreshedToken = '[Auth] Init Set Resfreshed Token',
}
export class SetAuthDataAction implements Action {
    readonly type = AuthActionTypes.SetAuthData
    constructor(public payload: AuthState) {}
}
export class LoginAction implements Action {
    readonly type = AuthActionTypes.Login
    constructor(public payload: AuthRequest) {}
}
export class LogoutAction implements Action {
    readonly type = AuthActionTypes.Logout
    constructor() {}
}

export class ClearAuthDataAction implements Action {
    readonly type = AuthActionTypes.ClearAuthData
}
export type AuthActions = LoginAction | SetAuthDataAction | LogoutAction | ClearAuthDataAction
