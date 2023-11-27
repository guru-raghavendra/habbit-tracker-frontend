import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DashboardService } from './dashboard.service';
import { environment } from '../../../environments/environment';

describe('DashboardService', () => {
  let service: DashboardService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
      TestBed.configureTestingModule({
          imports: [HttpClientTestingModule],
          providers: [DashboardService]
      });

      service = TestBed.inject(DashboardService);
      httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify(); 
  });

  it('should retrieve today\'s data', () => {
    const mockResponse = { todays_habits: [], month_stats: [] };

    service.getTodayData().subscribe(data => {
        expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${environment.baseUrl}dashboard/get-todays-data/`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
  
  it('should post habit status', () => {
    const mockBody = { habit_id: 1, status: true };
    const mockResponse = { message: 'Success' };

    service.saveHabitStatus(mockBody).subscribe(response => {
        expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${environment.baseUrl}dashboard/save-habit-statuses/`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should put habit edit', () => {
    const mockBody = { id: 1, name: 'Test Habit' };
    const mockResponse = { message: 'Edit successful' };

    service.saveEdit(mockBody).subscribe(response => {
        expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${environment.baseUrl}dashboard/edit-habit/${mockBody.id}/`);
    expect(req.request.method).toBe('PUT');
    req.flush(mockResponse);
  });

  it('should delete a habit', () => {
    const mockId = 1;
    const mockResponse = { message: 'Habit deleted' };

    service.deleteHabit(mockId).subscribe(response => {
        expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${environment.baseUrl}dashboard/delete-habit/${mockId}/`);
    expect(req.request.method).toBe('DELETE');
    req.flush(mockResponse);
  });

  it('should post a new habit', () => {
    const mockBody = { name: 'New Habit' };
    const mockResponse = { message: 'Habit created' };

    service.createNewHabit(mockBody).subscribe(response => {
        expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${environment.baseUrl}dashboard/create-new-habit/`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });




});
