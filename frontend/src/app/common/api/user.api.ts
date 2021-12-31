import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { SignInCredentials } from 'src/app/core/requests/signin-credentials'
import { environment } from 'src/environments/environment'

@Injectable({
    providedIn: 'root',
})
export class UserApi {
    apiEndpoint: 'users'
    constructor(private http: HttpClient) {}

    signIn(signInCredentials: SignInCredentials): Observable<any> {
        return this.http.post(`${environment.apiUrl}/users/signin`, signInCredentials)
    }
}
