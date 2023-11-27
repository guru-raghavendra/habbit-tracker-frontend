import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { LoginService } from '../../services/login-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/shared/services/common-service.service';
import { of, throwError } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let loginServiceMock: any;
  let commonServiceMock: any;
  let router: Router;
  let route: ActivatedRoute;

  beforeEach(() => {
      loginServiceMock = jasmine.createSpyObj('LoginService', ['login', 'signUp', 'setCookie']);
      commonServiceMock = jasmine.createSpyObj('CommonService', ['showLoader', 'hideLoader', 'showError', 'showSuccess']);

      TestBed.configureTestingModule({
          declarations: [ LoginComponent ],
          imports: [ RouterTestingModule ],
          providers: [
              { provide: LoginService, useValue: loginServiceMock },
              { provide: CommonService, useValue: commonServiceMock },
              { provide: ActivatedRoute, useValue: { url: of([{ path: 'login' }]) } }
          ]
      });

      fixture = TestBed.createComponent(LoginComponent);
      component = fixture.componentInstance;
      router = TestBed.inject(Router);
      route = TestBed.inject(ActivatedRoute);
  });

  it('should set the current path based on the route', () => {
    fixture.detectChanges(); // Trigger ngOnInit
    expect(component.current).toEqual('login');
  });

  it('should handle successful login', () => {
    const mockResponse = { token: 'fake-token' };
    loginServiceMock.login.and.returnValue(of(mockResponse));
    spyOn(router, 'navigate');

    component.username = 'testuser';
    component.password = 'password';
    component.login();

    expect(loginServiceMock.login).toHaveBeenCalledWith({ username: 'testuser', password: 'password' });
    expect(loginServiceMock.setCookie).toHaveBeenCalledWith('fake-token');
    expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it('should handle login error', () => {
      loginServiceMock.login.and.returnValue(throwError({ status: 401, error: 'invalid Credentials' }));

      component.username = 'testuser';
      component.password = 'password';
      component.login();

      expect(commonServiceMock.showError).toHaveBeenCalledWith('invalid Credentials');
  });

  it('should handle successful sign up', () => {
    loginServiceMock.signUp.and.returnValue(of({}));
    spyOn(router, 'navigate');

    component.username = 'newuser';
    component.password = 'password';
    component.signUp();

    expect(loginServiceMock.signUp).toHaveBeenCalledWith({ username: 'newuser', password: 'password' });
    expect(router.navigate).toHaveBeenCalledWith(['../login'], { relativeTo: route });
  });

  it('should handle sign up error', () => {
      const errorResponse = { error: { username: ['Username already taken'] } };
      loginServiceMock.signUp.and.returnValue(throwError(errorResponse));

      component.username = 'newuser';
      component.password = 'password';
      component.signUp();

      expect(commonServiceMock.showError).toHaveBeenCalledWith('Username already taken');
  });


  it('should navigate to sign-up when on login page', () => {
    component.current = 'login';
    spyOn(router, 'navigate');

    component.gotToOther();

    expect(router.navigate).toHaveBeenCalledWith(['../sign-up'], { relativeTo: route });
  });

  it('should navigate to login when on sign-up page', () => {
    component.current = 'sign-up';
    spyOn(router, 'navigate');

    component.gotToOther();

    expect(router.navigate).toHaveBeenCalledWith(['../login'], { relativeTo: route });
  });



  

});
