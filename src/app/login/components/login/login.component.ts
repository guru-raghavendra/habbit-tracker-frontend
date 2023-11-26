import { Component, OnInit } from '@angular/core';
import { LoginServiceService } from '../../services/login-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/shared/services/common-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  current:string = 'login'
  username:string = ''
  password:string = ''
  
  constructor(
    private service: LoginServiceService,
    private route: ActivatedRoute,
    private router: Router,
    private commonService: CommonService) { }

  ngOnInit(): void {
    this.route.url.subscribe(urlSegments => {
      console.log(urlSegments);
      this.current = urlSegments[0].path;
    });
  }

  login(){
    this.commonService.showLoader()
    let body = {
      username: this.username,
      password: this.password
    }
    this.service.login(body).subscribe({
      next: (response:any)=>{
        this.service.setCookie(response.token)
        this.router.navigate(['/dashboard']);
        this.commonService.hideLoader()
      },
      error: (err) => {
        if(err.status== 401){
          this.commonService.showError( "invalid Credentials")
        }
        else{
          this.commonService.showError(err.error)
        }
        this.commonService.hideLoader()
      }
    })
  }
  

  signUp(){
    this.commonService.showLoader()
    let body = {
      username: this.username,
      password: this.password
    }
    this.service.signUp(body).subscribe({
      next: (response:any)=>{
        this.commonService.showSuccess("Success")
        this.router.navigate(['../login'], { relativeTo: this.route });
        this.commonService.hideLoader()
      },
      error: (err) => {
        this.commonService.showError(err.error.username[0])
        this.commonService.hideLoader()
      }
    })
  }

  gotToOther(){
    if(this.current == 'login'){
      this.router.navigate(['../sign-up'], { relativeTo: this.route });
    }
    else{
      this.router.navigate(['../login'], { relativeTo: this.route });
    }
  }
}
