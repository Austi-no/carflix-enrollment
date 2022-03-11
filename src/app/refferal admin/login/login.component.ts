import { AppService } from 'src/app/service/app.service';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: any
  password: any

  constructor(private service: AppService,) { }

  ngOnInit() {

    sessionStorage.removeItem('user');
  }

  login() {
    this.service.login(this.email, this.password);
  }

}
