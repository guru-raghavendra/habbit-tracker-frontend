import { TestBed } from '@angular/core/testing';
import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Injector } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { TokenInterceptor } from './token.interceptor';

describe('TokenInterceptor', () => {
  let interceptor: TokenInterceptor;
  let injectorMock: jasmine.SpyObj<Injector>;
  let cookieServiceMock: jasmine.SpyObj<CookieService>;

  beforeEach(() => {
      cookieServiceMock = jasmine.createSpyObj('CookieService', ['get']);
      injectorMock = jasmine.createSpyObj('Injector', ['get']);

      TestBed.configureTestingModule({
          providers: [
              TokenInterceptor,
              { provide: Injector, useValue: injectorMock },
              { provide: CookieService, useValue: cookieServiceMock }
          ]
      });

      interceptor = TestBed.inject(TokenInterceptor);
      injectorMock.get.and.returnValue(cookieServiceMock);
  });

  it('should add Authorization header when token is present', () => {
    const token = 'test-token';
    cookieServiceMock.get.and.returnValue(token);
    const httpRequestMock = new HttpRequest('GET', '/test');

    const httpHandlerMock = jasmine.createSpyObj('HttpHandler', ['handle']);
    httpHandlerMock.handle.and.returnValue(of(null));

    interceptor.intercept(httpRequestMock, httpHandlerMock).subscribe();

    const modifiedRequest = httpHandlerMock.handle.calls.argsFor(0)[0] as HttpRequest<any>;
    expect(modifiedRequest.headers.has('Authorization')).toBeTruthy();
    expect(modifiedRequest.headers.get('Authorization')).toBe(`Token ${token}`);
  });

  it('should not add Authorization header when token is not present', () => {
    cookieServiceMock.get.and.returnValue('');
    const httpRequestMock = new HttpRequest('GET', '/test');

    const httpHandlerMock = jasmine.createSpyObj('HttpHandler', ['handle']);
    httpHandlerMock.handle.and.returnValue(of(null));

    interceptor.intercept(httpRequestMock, httpHandlerMock).subscribe();

    const modifiedRequest = httpHandlerMock.handle.calls.argsFor(0)[0] as HttpRequest<any>;
    expect(modifiedRequest.headers.has('Authorization')).toBeFalsy();
  });

});
