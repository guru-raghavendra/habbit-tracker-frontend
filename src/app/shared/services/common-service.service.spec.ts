import { TestBed } from '@angular/core/testing';
import { CommonService } from './common-service.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';

describe('CommonService', () => {
  let service: CommonService;
  let ngxLoaderMock: jasmine.SpyObj<NgxUiLoaderService>;
  let toastrMock: jasmine.SpyObj<ToastrService>;

  beforeEach(() => {
      ngxLoaderMock = jasmine.createSpyObj('NgxUiLoaderService', ['start', 'stop']);
      toastrMock = jasmine.createSpyObj('ToastrService', ['success', 'error']);

      TestBed.configureTestingModule({
          providers: [
              CommonService,
              { provide: NgxUiLoaderService, useValue: ngxLoaderMock },
              { provide: ToastrService, useValue: toastrMock }
          ]
      });

      service = TestBed.inject(CommonService);
  });

  it('should show success message', () => {
    const message = 'Success!';
    service.showSuccess(message);
    expect(toastrMock.success).toHaveBeenCalledWith(message);
  });

  it('should show error message from error object', () => {
    const error = { error: 'Error occurred' };
    service.showError(error);
    expect(toastrMock.error).toHaveBeenCalledWith(error.error);
  });

  it('should show error message directly if error object is not present', () => {
      const errorMessage = 'Error occurred';
      service.showError(errorMessage);
      expect(toastrMock.error).toHaveBeenCalledWith(errorMessage);
  });

  it('should start loader', () => {
    service.showLoader();
    expect(ngxLoaderMock.start).toHaveBeenCalled();
  });

  it('should stop loader', () => {
      service.hideLoader();
      expect(ngxLoaderMock.stop).toHaveBeenCalled();
  });


  
});
