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
      //todo
    }

    fillEmptyDates(){
      //todo
    }

    save(){
      //todo
    }

    updateHabitClick(habit:any): void {
      //todo
    }


    saveEdit(habit:any){
      //todo
    }

    deleteHabit(id:number){
      //todo
    }

    saveNew(habbitName:string){
      //todo
    }

  }
