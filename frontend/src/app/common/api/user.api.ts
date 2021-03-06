import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { SignCredentials } from 'src/app/core/requests/signin-credentials'
import { environment } from 'src/environments/environment'
import { ChangeAvatarRequest } from '../requests/change-avatar.request'

@Injectable({
    providedIn: 'root',
})
export class UserApi {
    apiEndpoint: 'users'
    constructor(private http: HttpClient) {}

    getUser(userId: number): Observable<any> {
        return this.http.get(`${environment.apiUrl}/users/${userId}`)
    }
    signIn(signInCredentials: SignCredentials): Observable<any> {
        return this.http.post(`${environment.apiUrl}/users/signin`, signInCredentials)
    }

    signUp(signUpCredentials: SignCredentials): Observable<any> {
        return this.http.post(`${environment.apiUrl}/users/signup`, signUpCredentials)
    }
    logout(): Observable<any> {
        return this.http.put(`${environment.apiUrl}/users/logout`, null)
    }
    getAllUsers(): Observable<any> {
        return this.http.get(`${environment.apiUrl}/users`)
    }
    changeAvatar(changeAvatarRequest: ChangeAvatarRequest): Observable<any> {
        return this.http.put(`${environment.apiUrl}/users/avatar`, changeAvatarRequest)
    }
}
