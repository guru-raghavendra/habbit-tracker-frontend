import { TestBed } from '@angular/core/testing';
import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { ErrorInterceptor } from './error.interceptor';

describe('ErrorInterceptor', () => {
  let interceptor: ErrorInterceptor;
  let cookieServiceMock: jasmine.SpyObj<CookieService>;
  let routerMock: jasmine.SpyObj<Router>;

  beforeEach(() => {
      cookieServiceMock = jasmine.createSpyObj('CookieService', ['deleteAll']);
      routerMock = jasmine.createSpyObj('Router', ['navigate']);

      TestBed.configureTestingModule({
          providers: [
              ErrorInterceptor,
              { provide: CookieService, useValue: cookieServiceMock },
              { provide: Router, useValue: routerMock }
          ]
      });

      interceptor = TestBed.inject(ErrorInterceptor);
  });

  it('should redirect to login on 401 error', (done) => {
    const httpRequestMock = new HttpRequest('GET', '/test');
    const httpHandlerMock = {
        handle: jasmine.createSpy('handle').and.returnValue(throwError({ status: 401 }))
    } as HttpHandler;

    interceptor.intercept(httpRequestMock, httpHandlerMock).subscribe(
        () => {},
        (error) => {
            expect(error.status).toBe(401);
            expect(cookieServiceMock.deleteAll).toHaveBeenCalled();
            expect(routerMock.navigate).toHaveBeenCalledWith(['/auth/login']);
            done();
        }
    );
  });

  it('should not redirect or delete cookies for non-401 error', (done) => {
    const httpRequestMock = new HttpRequest('GET', '/test');
    const httpHandlerMock = {
        handle: jasmine.createSpy('handle').and.returnValue(throwError({ status: 500 }))
    } as HttpHandler;

    interceptor.intercept(httpRequestMock, httpHandlerMock).subscribe(
        () => {},
        (error) => {
            expect(error.status).toBe(500);
            expect(cookieServiceMock.deleteAll).not.toHaveBeenCalled();
            expect(routerMock.navigate).not.toHaveBeenCalledWith(['/auth/login']);
            done();
        }
    );
  });



});
