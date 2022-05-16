import { AuthActions, AuthActionTypes } from '../actions/auth.action'
import { AuthState } from '../app.state'
const INITIAL_STATE: AuthState = {
    isAuthenticated: false,
    token: '',
    username: '',
    userId: null,
    statusId: null,
    avatarId: null,
    currentReceiver: null,
    onlineUsers: null,
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
                statusId: action.payload.statusId,
                avatarId: action.payload.avatarId,
            }
            return <AuthState>Object.assign({}, state, auth)
        }
        case AuthActionTypes.ClearAuthData: {
            return INITIAL_STATE
        }
        case AuthActionTypes.GetComplete: {
            return <AuthState>Object.assign({}, state, { contacts: action.payload })
        }
        case AuthActionTypes.SetAvatar: {
            const localState = JSON.parse(localStorage.getItem('chatapp'))
            const newLocalState = Object.assign({}, localState, { avatarId: action.payload.avatar })
            localStorage.setItem('chatapp', JSON.stringify(newLocalState))
            return <AuthState>Object.assign({}, state, { avatarId: action.payload.avatar })
        }
        case AuthActionTypes.SetCurrentReceiver: {
            return <AuthState>Object.assign({}, state, { currentReceiver: action.payload })
        }
        case AuthActionTypes.SetOnlineUsers: {
            return <AuthState>Object.assign({}, state, { onlineUsers: action.payload })
        }
        case AuthActionTypes.SetUnreadMessages: {
            if (state.unreadMessages) {
                if (!state.unreadMessages.find((x) => x.senderUserId === action.payload.senderUserId)) {
                    return <AuthState>Object.assign({}, state, { unreadMessages: [...state.unreadMessages, action.payload] })
                }
            } else {
                return <AuthState>Object.assign({}, state, { unreadMessages: [action.payload] })
            }

            return state
        }
        case AuthActionTypes.RemoveMessageUnread: {
            if (state.unreadMessages) {
                const unreadMessage = state.unreadMessages.findIndex((x) => x.senderUserId === action.payload)
                if (unreadMessage !== -1) {
                    const newState = [...state.unreadMessages]
                    newState.splice(unreadMessage, 1)
                    return <AuthState>Object.assign({}, state, { unreadMessages: newState })
                }
            }

            return state
        }
        default:
            return state
    }
}
