import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewHabitComponent } from './add-new-habit.component';

describe('AddNewHabitComponent', () => {
  let component: AddNewHabitComponent;
  let fixture: ComponentFixture<AddNewHabitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewHabitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewHabitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
