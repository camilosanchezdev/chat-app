import { Action } from '@ngrx/store'
import { AuthRequest } from '../../requests/auth.request'
import { AuthState } from '../app.state'

export enum AuthActionTypes {
    SetAuthData = '[Auth] Set Authentication Data',
    Login = '[Auth] Login ',
    Logout = '[Auth] Logout User',
    ClearAuthData = '[Auth] Clear Authentication Data',
    Register = '[SignUp] Register new user',
    GetComplete = '[User Data] Set User Data',
    SetAvatar = '[User Data] Set Avatar',
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
export class RegisterAction implements Action {
    readonly type = AuthActionTypes.Register
    constructor(public payload: AuthRequest) {}
}
export class ClearAuthDataAction implements Action {
    readonly type = AuthActionTypes.ClearAuthData
}
export class GetComplete implements Action {
    readonly type = AuthActionTypes.GetComplete
    constructor(public payload: any) {}
}
export class SetAvatar implements Action {
    readonly type = AuthActionTypes.SetAvatar
    constructor(public payload: any) {}
}
export type AuthActions = LoginAction | SetAuthDataAction | LogoutAction | ClearAuthDataAction | RegisterAction | GetComplete | SetAvatar
