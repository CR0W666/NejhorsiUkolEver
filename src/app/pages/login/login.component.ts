import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ConstantsService } from '../../services/constants.service';
import { Data } from 'src/app/data';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // tslint:disable-next-line:variable-name
  constructor(private httpClient: HttpClient, private router: Router, private _constant: ConstantsService) {
    this.httpClient = httpClient;

  }
  pass;
  email;


  getAccesstoken() {

    const url = this._constant.server_ip + 'session/login';
    const body = {
      password: this.pass,
      email: this.email
    };
    this.httpClient
      .post<Data>(url, body)
      .subscribe( (data) => {
        this._constant.access_token = this._constant.access_token.set('User_Token', data.access_token);
        console.log(this._constant.access_token);
        console.log(data.access_token);
        this.router.navigate(['/user']);


    }, (error) => {
      console.log(error);
    });


  }

  ngOnInit() {
  }

}
