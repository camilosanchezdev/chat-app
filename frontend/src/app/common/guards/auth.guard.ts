import { Injectable } from '@angular/core'
import { CanActivate } from '@angular/router'
import { Observable } from 'rxjs'
import { AuthService } from 'src/app/core/services/auth.service'

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService) {}
    canActivate(): Observable<boolean> {
        return this.authService.isAuth()
    }
}
