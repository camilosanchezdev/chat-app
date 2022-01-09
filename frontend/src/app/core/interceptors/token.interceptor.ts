import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { switchMap } from 'rxjs/operators'
import { environment } from 'src/environments/environment'
import { EXCEPTION } from '../config/url-exceptions.config'
import { AuthService } from '../services/auth.service'

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) {}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.isExceptionUrl(req.url)) {
            return next.handle(req)
        }
        return this.authService.getCurrentToken().pipe(
            switchMap((token) => {
                if (token && token != '' && req.url.includes(environment.apiUrl)) {
                    req = req.clone({
                        setHeaders: {
                            Authorization: `Bearer ${token}`,
                        },
                    })
                }
                return next.handle(req)
            })
        )
    }
    private isExceptionUrl(url: string): boolean {
        let exist = false
        EXCEPTION.forEach((exc) => {
            if (url.includes(exc)) {
                exist = true
            }
        })
        return exist
    }
}
export let tokenInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true,
}
