import { AuthActions, AuthActionTypes } from '../actions/auth.action'
import { AuthState } from '../app.state'
const INITIAL_STATE: AuthState = {
    isAuthenticated: false,
    token: '',
}
export function AuthReducer(state: AuthState = INITIAL_STATE, action: AuthActions): AuthState {
    switch (action.type) {
        case AuthActionTypes.SetAuthData: {
            return <AuthState>Object.assign({}, state, action.payload)
        }
        case AuthActionTypes.Login:
        case AuthActionTypes.Register: {
            const auth: AuthState = {
                isAuthenticated: true,
                token: action.payload.token,
            }
            return <AuthState>Object.assign({}, state, auth)
        }
        case AuthActionTypes.ClearAuthData: {
            return INITIAL_STATE
        }
        default:
            return state
    }
}
