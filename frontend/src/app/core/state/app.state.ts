export interface AuthState {
    isAuthenticated: boolean
    token: string
    username: string
    userId: number
    statusId: number
    avatarId: number
    contacts?: any
}
