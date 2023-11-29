import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/shared/services/common-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  current: string = 'login';
  username: string = '';
  password: string = '';

  constructor(
    private service: LoginService,
    private route: ActivatedRoute,
    private router: Router,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.route.url.subscribe((urlSegments) => {
      console.log(urlSegments);
      this.current = urlSegments[0].path;
    });
  }

  login() {
     //todo
  }

  signUp() {
     //todo
  }

  gotToOther() {
     //todo
  }
}
