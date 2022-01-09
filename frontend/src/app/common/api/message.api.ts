import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'

@Injectable({
    providedIn: 'root',
})
export class MessageApi {
    apiEndpoint: 'messages'
    constructor(private http: HttpClient) {}

    getConversation(userId): Observable<any> {
        return this.http.get(`${environment.apiUrl}/messages/${userId}`)
    }
}
