export interface AuthState {
    isAuthenticated: boolean
    token: string
    username: string
    userId: number
    contacts?: any
}
