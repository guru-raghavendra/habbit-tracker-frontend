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

  setCookie(token:string){
    this.cookieService.set('token', token)
  }

  getTodayData(obj:any){

    let data = {
      "todays_habits": [
          {
              "habit": 1,
              "habit_name": "workout",
              "completed": false
          },
          {
              "habit": 2,
              "habit_name": "play guitar",
              "completed": false
          },
          {
              "habit": 3,
              "habit_name": "play guitar",
              "completed": false
          },
          {
              "habit": 4,
              "habit_name": "play guitar",
              "completed": false
          },
          {
              "habit": 5,
              "habit_name": "play guitar",
              "completed": false
          },
          {
              "habit": 6,
              "habit_name": "play guitar2",
              "completed": false
          },
          {
              "habit": 7,
              "habit_name": "play guitar3",
              "completed": false
          },
          {
              "habit": 8,
              "habit_name": "play guitar3",
              "completed": false
          }
      ],
      "month_stats": [
          {
              "date": "2023-11-01",
              "total_habits": 0,
              "completed_habits": 0
          },
          {
              "date": "2023-11-02",
              "total_habits": 0,
              "completed_habits": 0
          },
          {
              "date": "2023-11-03",
              "total_habits": 0,
              "completed_habits": 0
          },
          {
              "date": "2023-11-04",
              "total_habits": 0,
              "completed_habits": 0
          },
          {
              "date": "2023-11-05",
              "total_habits": 0,
              "completed_habits": 0
          },
          {
              "date": "2023-11-06",
              "total_habits": 0,
              "completed_habits": 0
          },
          {
              "date": "2023-11-07",
              "total_habits": 0,
              "completed_habits": 0
          },
          {
              "date": "2023-11-08",
              "total_habits": 0,
              "completed_habits": 0
          },
          {
              "date": "2023-11-09",
              "total_habits": 0,
              "completed_habits": 0
          },
          {
              "date": "2023-11-10",
              "total_habits": 0,
              "completed_habits": 0
          },
          {
              "date": "2023-11-11",
              "total_habits": 0,
              "completed_habits": 0
          },
          {
              "date": "2023-11-12",
              "total_habits": 0,
              "completed_habits": 0
          },
          {
              "date": "2023-11-13",
              "total_habits": 0,
              "completed_habits": 0
          },
          {
              "date": "2023-11-14",
              "total_habits": 0,
              "completed_habits": 0
          },
          {
              "date": "2023-11-15",
              "total_habits": 0,
              "completed_habits": 0
          },
          {
              "date": "2023-11-16",
              "total_habits": 0,
              "completed_habits": 0
          },
          {
              "date": "2023-11-17",
              "total_habits": 0,
              "completed_habits": 0
          },
          {
              "date": "2023-11-18",
              "total_habits": 0,
              "completed_habits": 0
          },
          {
              "date": "2023-11-19",
              "total_habits": 0,
              "completed_habits": 0
          },
          {
              "date": "2023-11-20",
              "total_habits": 0,
              "completed_habits": 0
          },
          {
              "date": "2023-11-21",
              "total_habits": 0,
              "completed_habits": 0
          },
          {
              "date": "2023-11-22",
              "total_habits": 0,
              "completed_habits": 0
          },
          {
              "date": "2023-11-23",
              "total_habits": 0,
              "completed_habits": 0
          },
          {
              "date": "2023-11-24",
              "total_habits": 0,
              "completed_habits": 0
          },
          {
              "date": "2023-11-25",
              "total_habits": 8,
              "completed_habits": 1
          },
          {
              "date": "2023-11-26",
              "total_habits": 8,
              "completed_habits": 0
          },
          {
              "date": "2023-11-27",
              "total_habits": 8,
              "completed_habits": 0
          }
      ]
    }
    return of(data)
    // return this.http.post(this.baseURL + 'accounts/login/', obj)
  }
  
  signUp(obj:any){
    return this.http.post(this.baseURL + 'accounts/signup/', obj)
  }
}
