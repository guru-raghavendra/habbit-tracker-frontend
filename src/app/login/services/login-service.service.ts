import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  private baseURL: string;

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,) { 
    this.baseURL = environment.baseUrl;
  }

  setCookie(token:string){
    this.cookieService.set('token', token)
  }

  login(obj:any){
    return this.http.post(this.baseURL + 'accounts/login/', obj)
  }
  
  signUp(obj:any){
    return this.http.post(this.baseURL + 'accounts/signup/', obj)
  }
}
