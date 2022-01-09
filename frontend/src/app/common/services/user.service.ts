import { Injectable } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { GetComplete } from 'src/app/core/state/actions/auth.action'
import { AuthState } from 'src/app/core/state/app.state'
import { ContactApi } from '../api/contact.api'

@Injectable({
    providedIn: 'root',
})
export class UserService {
    constructor(private contactApi: ContactApi, private store: Store<AuthState>) {}

    getContacts(): Observable<any> {
        return this.contactApi.getContacts().pipe(
            map((response) => {
                this.store.dispatch(new GetComplete(response))
                return response
            })
        )
    }
}
