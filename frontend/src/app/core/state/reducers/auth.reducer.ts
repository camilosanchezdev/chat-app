import { AuthActions, AuthActionTypes } from '../actions/auth.action'
import { AuthState } from '../app.state'
const INITIAL_STATE: AuthState = {
    isAuthenticated: false,
    token: '',
    username: '',
    userId: null,
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
                username: action.payload.username,
                userId: action.payload.userId,
            }
            return <AuthState>Object.assign({}, state, auth)
        }
        case AuthActionTypes.ClearAuthData: {
            return INITIAL_STATE
        }
        case AuthActionTypes.GetComplete: {
            return <AuthState>Object.assign({}, state, { contacts: action.payload })
        }
        default:
            return state
    }
}
