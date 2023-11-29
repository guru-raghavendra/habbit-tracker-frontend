import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { CommonService } from 'src/app/shared/services/common-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @ViewChild('scrollContainer')
  scrollContainer!: ElementRef;

  

  constructor(
    private service: DashboardService,
    private commonService: CommonService) { }

    todays_habits:any = []
    month_stats:any = []
    updateHabit:any = []

    mode='update'
    openAddNew:boolean = false
    daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  
    ngOnInit() {
      this.initData()
    }

    ngAfterViewInit() {
      this.scrollToEnd();
    }
  
    private scrollToEnd(): void {
      console.log(this.scrollContainer)
      const element = this.scrollContainer.nativeElement;
      element.scrollTop = element.scrollHeight;
    }

    initData(){
      this.commonService.showLoader()
      this.service.getTodayData().subscribe({
        next: (response:any) => {
          this.todays_habits = response.todays_habits
          this.month_stats = response.month_stats
          this.fillEmptyDates()
          if(this.todays_habits.length == 0){
            this.mode = 'edit'
          }
          this.commonService.hideLoader()
        },
        error: (err) => {
          this.commonService.showError(err.error)
          this.commonService.hideLoader()
        }
      })
    }

    fillEmptyDates(){
      let day = new Date(this.month_stats[0].date);
      while (day.getDay() !== 0) {
        day.setDate(day.getDate() - 1);
        this.month_stats.unshift(
          {
            date: day.toISOString().split('T')[0],
            total_habits: -1,
            completed_habits: 0
          }
        );
      }

      day = new Date(this.month_stats[this.month_stats.length - 1].date);
      while (day.getDay() !== 6) {
        day.setDate(day.getDate() + 1);
        this.month_stats.push(
          {
            date: day.toISOString().split('T')[0],
            total_habits: -1,
            completed_habits: 0
          }
        );
      }
    }

    save(){
      this.commonService.showLoader()
      this.service.saveHabitStatus(this.updateHabit).subscribe({
        next: (response:any) => {
          this.updateHabit = []
          this.commonService.showSuccess(response.message)
          this.commonService.hideLoader()
        },
        error: (err) => {
          this.commonService.showError(err.error)
          this.commonService.hideLoader()
        }
      })
    }

    updateHabitClick(habit:any): void {
      habit.completed = !habit.completed
      const existingHabit = this.updateHabit.find((h: { habit_id: number; status:string }) => h.habit_id === habit.habit);
  
      if (existingHabit) {
        existingHabit.status = habit.completed
      } else {
        this.updateHabit.push({ habit_id: habit.habit, status: habit.completed });
      }
    }


    saveEdit(habit:any){
      this.commonService.showLoader()
      let body = {
        name: habit.habit_name,
        id: habit.habit
      }
      this.service.saveEdit(body).subscribe({
        next: (response:any) => {
          this.commonService.showSuccess(response.message)
          this.commonService.hideLoader()
        },
        error: (err) => {
          this.commonService.showError(err.error)
          this.commonService.hideLoader()
        }
      })
    }

    deleteHabit(id:number){
      this.commonService.showLoader()
      this.service.deleteHabit(id).subscribe({
        next: (response:any) => {
          this.commonService.showSuccess(response.message)
          this.month_stats = response.month_stats
          this.fillEmptyDates()
          this.todays_habits = this.todays_habits.filter((habit: { habit: number; }) => habit.habit !== id);
          this.scrollToEnd();

          
          this.commonService.hideLoader()
        },
        error: (err) => {
          this.commonService.showError(err.error)
          this.commonService.hideLoader()
        }
      })
    }

    saveNew(habbitName:string){
      this.openAddNew = false
      if(habbitName){
        this.commonService.showLoader()
        let body = {
          name : habbitName
        }
        this.service.createNewHabit(body).subscribe({
          next: (response:any) => {
            this.todays_habits = response.todays_habits
            this.month_stats = response.month_stats
            this.fillEmptyDates()
            this.commonService.showSuccess("success")
            this.commonService.hideLoader()
          },
          error: (err) => {
            this.commonService.showError(err.error)
            this.commonService.hideLoader()
          }
        })
      }
    }

  }
