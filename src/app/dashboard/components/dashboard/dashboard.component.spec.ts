import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { DashboardService } from '../../services/dashboard.service';
import { CommonService } from 'src/app/shared/services/common-service.service';
import { of, throwError } from 'rxjs';
import { ElementRef } from '@angular/core';

describe('DashboardComponent', () => {
    let component: DashboardComponent;
    let fixture: ComponentFixture<DashboardComponent>;
    let dashboardServiceMock: any;
    let commonServiceMock: any;
    let mockElementRef: any;

    beforeEach(async () => {
        dashboardServiceMock = jasmine.createSpyObj('DashboardService', ['getTodayData', 'saveHabitStatus', 'saveEdit', 'createNewHabit', 'deleteHabit']);
        commonServiceMock = jasmine.createSpyObj('CommonService', ['showLoader', 'hideLoader', 'showSuccess', 'showError']);

        dashboardServiceMock.getTodayData.and.returnValue(of({ todays_habits: [], month_stats: [] }));
        dashboardServiceMock.saveHabitStatus.and.returnValue(of({ message: 'Success' }));
        dashboardServiceMock.saveEdit.and.returnValue(of({ message: 'Edit successful' }));
        dashboardServiceMock.createNewHabit.and.returnValue(of({ todays_habits: [], month_stats: [] }));
        dashboardServiceMock.deleteHabit.and.returnValue(of({ message: 'Habit deleted' }));

        mockElementRef = {
            nativeElement: {
                scrollTop: 0,
                scrollHeight: 1000
            }
        };

        await TestBed.configureTestingModule({
            declarations: [ DashboardComponent ],
            providers: [
                { provide: DashboardService, useValue: dashboardServiceMock },
                { provide: CommonService, useValue: commonServiceMock },
                { provide: ElementRef, useValue: mockElementRef }
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DashboardComponent);
        component = fixture.componentInstance;
        component.scrollContainer = new ElementRef(mockElementRef.nativeElement);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call getTodayData and handle response', () => {
      const response = { todays_habits: [], month_stats: [
        {
          "date": "2023-10-28",
          "total_habits": 0,
          "completed_habits": 0
      }] };
      dashboardServiceMock.getTodayData.and.returnValue(of(response));

      component.initData();

      expect(dashboardServiceMock.getTodayData).toHaveBeenCalled();
      expect(component.todays_habits).toEqual(response.todays_habits);
      expect(component.month_stats).toEqual(response.month_stats);
    });

  it('should handle error in getTodayData', () => {
    const errorResponse = { error: new Error('Error occurred') }
    dashboardServiceMock.getTodayData.and.returnValue(throwError(() => errorResponse));

    component.initData();

    expect(dashboardServiceMock.getTodayData).toHaveBeenCalled();
    expect(commonServiceMock.showError).toHaveBeenCalledWith(errorResponse.error);
  });

  it('should fill empty dates to start with Sunday and end with Saturday', () => {
    component.month_stats = [
        { date: '2023-01-03', total_habits: 2, completed_habits: 1 }, // Assume this is a Tuesday
        { date: '2023-01-04', total_habits: 2, completed_habits: 1 }  // Wednesday
        
    ];

    component.fillEmptyDates();

    let firstDate = new Date(component.month_stats[0].date);
    expect(firstDate.getDay()).toEqual(0); // 0 is Sunday

    let lastDate = new Date(component.month_stats[component.month_stats.length - 1].date);
    expect(lastDate.getDay()).toEqual(6); // 6 is Saturday

  });
  

  it('should handle successful save', () => {
    const response = { message: 'Habit updated successfully' };
    dashboardServiceMock.saveHabitStatus.and.returnValue(of(response));
    const updateHabit = [{ habit_id: 1, status: true }]
    component.updateHabit = updateHabit;

    component.save();

    expect(dashboardServiceMock.saveHabitStatus).toHaveBeenCalledWith(updateHabit);
    expect(component.updateHabit).toEqual([]);
  });

  it('should handle error on save', () => {
    const errorResponse = { error: new Error('Error occurred') }
    dashboardServiceMock.saveHabitStatus.and.returnValue(throwError(() => errorResponse));

    component.save();

    expect(dashboardServiceMock.saveHabitStatus).toHaveBeenCalled();
    expect(commonServiceMock.showError).toHaveBeenCalledWith(errorResponse.error);
  });


  it('should add new habit status to updateHabit when habit is not already in updateHabit', () => {
    const habit = { habit: 1, completed: false };
    component.updateHabit = [];

    component.updateHabitClick(habit);

    expect(habit.completed).toBeTrue();
    expect(component.updateHabit.length).toBe(1);
    expect(component.updateHabit[0]).toEqual({ habit_id: habit.habit, status: habit.completed });
  });

  it('should update existing habit status in updateHabit when habit is already in updateHabit', () => {
    const habit = { habit: 1, completed: false };
    component.updateHabit = [{ habit_id: habit.habit, status: habit.completed }];

    component.updateHabitClick(habit);

    expect(habit.completed).toBeTrue();
    expect(component.updateHabit.length).toBe(1);
    expect(component.updateHabit[0].status).toBe(habit.completed);
  });


  it('should handle successful edit', () => {
    const mockHabit = { habit: 1, habit_name: 'Test Habit' };
    const mockResponse = { message: 'Edit successful' };
    dashboardServiceMock.saveEdit.and.returnValue(of(mockResponse));

    component.saveEdit(mockHabit);

    expect(dashboardServiceMock.saveEdit).toHaveBeenCalledWith({ name: mockHabit.habit_name, id: mockHabit.habit });
    fixture.whenStable().then(() => {
        expect(commonServiceMock.showSuccess).toHaveBeenCalledWith(mockResponse.message);
    });
  });

  it('should handle error on edit', () => {
    const mockHabit = { habit: 1, habit_name: 'Test Habit' };
    const errorResponse = { error: new Error('Error occurred') }
    dashboardServiceMock.saveEdit.and.returnValue(throwError(() => errorResponse));

    component.saveEdit(mockHabit);

    expect(dashboardServiceMock.saveEdit).toHaveBeenCalledWith({ name: mockHabit.habit_name, id: mockHabit.habit });
    fixture.whenStable().then(() => {
        expect(commonServiceMock.showError).toHaveBeenCalledWith(errorResponse.error);
    });
  });


  it('should handle successful habit deletion', () => {
    const mockId = 1;
    const mockResponse = { message: 'Habit deleted successfully', month_stats: [
      { date: '2023-01-03', total_habits: 2, completed_habits: 1 },
      { date: '2023-01-04', total_habits: 2, completed_habits: 1 }  
      
    ]};
    dashboardServiceMock.deleteHabit.and.returnValue(of(mockResponse));
    component.todays_habits = [{ habit: mockId, habit_name: 'Test Habit' }];

    component.deleteHabit(mockId);

    expect(dashboardServiceMock.deleteHabit).toHaveBeenCalledWith(mockId);
    fixture.whenStable().then(() => {
        expect(component.month_stats).toEqual(mockResponse.month_stats);
        expect(component.todays_habits.length).toBe(2);
        expect(commonServiceMock.showSuccess).toHaveBeenCalledWith(mockResponse.message);
    });
  });

  it('should handle error on habit deletion', () => {
    const mockId = 1;
    const errorResponse = { error: new Error('Error occurred') }
    dashboardServiceMock.deleteHabit.and.returnValue(throwError(() => errorResponse));

    component.deleteHabit(mockId);

    expect(dashboardServiceMock.deleteHabit).toHaveBeenCalledWith(mockId);
    expect(commonServiceMock.showLoader).toHaveBeenCalled();
    fixture.whenStable().then(() => {
        expect(commonServiceMock.showError).toHaveBeenCalledWith(errorResponse.error);
        expect(commonServiceMock.hideLoader).toHaveBeenCalled();
    });
  });

  it('should handle successful new habit creation', () => {
    const mockHabitName = 'New Habit';
    const mockResponse = {
        todays_habits: [{ habit: 1, habit_name: mockHabitName }],
        month_stats: [
          { date: '2023-01-03', total_habits: 2, completed_habits: 1 },
          { date: '2023-01-04', total_habits: 2, completed_habits: 1 }  
          
        ]
    };
    dashboardServiceMock.createNewHabit.and.returnValue(of(mockResponse));

    component.saveNew(mockHabitName);

    expect(dashboardServiceMock.createNewHabit).toHaveBeenCalledWith({ name: mockHabitName });
    fixture.whenStable().then(() => {
        expect(component.todays_habits).toEqual(mockResponse.todays_habits);
        expect(component.month_stats).toEqual(mockResponse.month_stats);
        expect(component.openAddNew).toBeFalse();
        expect(commonServiceMock.showSuccess).toHaveBeenCalledWith("success");
    });
  });

  it('should handle error on new habit creation', () => {
    const mockHabitName = 'New Habit';
    const errorResponse = { error: new Error('Error occurred') }
    dashboardServiceMock.createNewHabit.and.returnValue(throwError(() => errorResponse));

    component.saveNew(mockHabitName);

    expect(dashboardServiceMock.createNewHabit).toHaveBeenCalledWith({ name: mockHabitName });
    expect(commonServiceMock.showLoader).toHaveBeenCalled();
    fixture.whenStable().then(() => {
        expect(commonServiceMock.showError).toHaveBeenCalledWith(errorResponse.error);
        expect(commonServiceMock.hideLoader).toHaveBeenCalled();
        expect(component.openAddNew).toBeFalse();
    });
  });






});
