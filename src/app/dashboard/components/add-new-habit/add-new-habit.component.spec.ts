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

  it('should emit empty string when back is called', () => {
    spyOn(component.newHabit, 'emit');
    component.back();
    expect(component.newHabit.emit).toHaveBeenCalledWith('');
  });

  it('should emit habit name when save is called', () => {
      const testHabitName = 'Test Habit';
      component.habitName = testHabitName;
      spyOn(component.newHabit, 'emit');
      component.save();
      expect(component.newHabit.emit).toHaveBeenCalledWith(testHabitName);
  });
});
