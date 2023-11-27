import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LoginService } from './login-service.service';
import { environment } from '../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';

describe('LoginService', () => {
  let service: LoginService;
  let httpMock: HttpTestingController;
  let cookieServiceMock: jasmine.SpyObj<CookieService>;

  beforeEach(() => {
      cookieServiceMock = jasmine.createSpyObj('CookieService', ['set']);

      TestBed.configureTestingModule({
          imports: [HttpClientTestingModule],
          providers: [
              LoginService,
              { provide: CookieService, useValue: cookieServiceMock }
          ]
      });

      service = TestBed.inject(LoginService);
      httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify(); 
  });

  it('should set a cookie', () => {
    const token = 'test-token';
    service.setCookie(token);
    expect(cookieServiceMock.set).toHaveBeenCalledWith('token', token);
  });

  it('should send a post request to login', () => {
    const mockObj = { username: 'test', password: 'test123' };
    service.login(mockObj).subscribe();

    const req = httpMock.expectOne(`${environment.baseUrl}accounts/login/`);
    expect(req.request.method).toBe('POST');
    req.flush(null); // Simulate a response
  });

  it('should send a post request to sign up', () => {
    const mockObj = { username: 'newuser', password: 'password123' };
    service.signUp(mockObj).subscribe();

    const req = httpMock.expectOne(`${environment.baseUrl}accounts/signup/`);
    expect(req.request.method).toBe('POST');
    req.flush(null); // Simulate a response
  });

});
