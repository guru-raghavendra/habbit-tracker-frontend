import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-add-new-habit',
  templateUrl: './add-new-habit.component.html',
  styleUrls: ['./add-new-habit.component.scss']
})
export class AddNewHabitComponent implements OnInit {
  
  @Output() newHabit = new EventEmitter<string>();
  constructor() { }
  habitName:string = ''

  ngOnInit(): void {
  }

  back(){
    //todo
  }
  
  save(){
     //todo
  }

}
