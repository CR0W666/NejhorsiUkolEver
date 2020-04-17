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
    localStorage.setItem('pass', this.pass);
    localStorage.setItem('email', this.email);
    const url = this._constant.server_ip + 'session/login';
    const body = {
      password: this.pass,
      email: this.email
    };
    this.httpClient
      .post<Data>(url, body)
      .subscribe( (data) => {
        // this._constant.access_token = this._constant.access_token.set('User_Token', data.access_token);  //old saving of token
        localStorage.setItem('User_Token', data.access_token);
        this._constant.access_token = localStorage.getItem('User_Token');
        // console.log(this._constant.access_token);
        console.log('AlocalStorage ' + localStorage.getItem('User_Token'));
        console.log( 'Ainterface ' + data.access_token);
        console.log( 'Aconstants' + this._constant.access_token);
        this.router.navigate(['/user']);


    }, (error) => {
      console.log(error);
    });


  }

  ngOnInit() {
  }

}
