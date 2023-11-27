import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private baseURL: string;

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,) { 
    this.baseURL = environment.baseUrl;
  }



  getTodayData(){
    return this.http.get(this.baseURL + 'dashboard/get-todays-data/')
  }

  saveHabitStatus(body:any){
    return this.http.post(this.baseURL + 'dashboard/save-habit-statuses/', body)
  }

  saveEdit(body:any){
    return this.http.put(this.baseURL + 'dashboard/edit-habit/' + body.id + '/', body)
  }

  deleteHabit(id:number){
    return this.http.delete(this.baseURL + `dashboard/delete-habit/${id}/`)
  }

  createNewHabit(body:any){
    return this.http.post(this.baseURL + 'dashboard/create-new-habit/', body)
  }
  

}
