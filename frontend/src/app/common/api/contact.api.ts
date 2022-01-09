import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'

@Injectable({
    providedIn: 'root',
})
export class ContactApi {
    apiEndpoint: 'contacts'
    constructor(private http: HttpClient) {}

    getContacts(): Observable<any> {
        return this.http.get(`${environment.apiUrl}/contacts`)
    }
}
