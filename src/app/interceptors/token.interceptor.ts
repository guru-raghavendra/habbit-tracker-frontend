import { HttpRequest, HttpHandler, HttpInterceptor, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable, Injector } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(private inject: Injector) {}

    setHeader(req: HttpRequest<any>){
        const cookieService = this.inject.get(CookieService);
        const token = cookieService.get('token');
        if(token){
            req = req.clone({
                setHeaders: {
                    Authorization: `Token ${token}`
                }
            });
        }
        return req;
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        req = this.setHeader(req);
        return next.handle(req);
    }
    
}