import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Data} from './data';
import { ConstantsService } from 'src/app/services/constants.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'API';

  // tslint:disable-next-line:variable-name
  constructor(private router: Router, private httpClient: HttpClient, private _constant: ConstantsService) {
  }

  ngOnInit(): void {
    console.log('localStorage ' + localStorage.getItem('User_Token'));
    if (localStorage.getItem('User_Token') != null || localStorage.getItem('User_Token') !== '') {
      console.log('localStorage ' + localStorage.getItem('User_Token'));

      const url = this._constant.server_ip + 'session/login';
      const body = {
        password: localStorage.getItem('pass'),
        email: localStorage.getItem('email')
      };
      localStorage.clear();
      this.httpClient
        .post<Data>(url, body)
        .subscribe( (data) => {
          // console.log(this._constant.access_token);
          console.log('localStorage ' + localStorage.getItem('User_Token'));
          console.log('interface ' + data.access_token);
          localStorage.setItem('User_Token', data.access_token);
          this._constant.access_token = localStorage.getItem('User_Token');
          // console.log(this._constant.access_token);
          console.log('B localStorage ' + localStorage.getItem('User_Token'));
          console.log( 'B interface ' + data.access_token);
          console.log( 'B constants' + this._constant.access_token);
          this.router.navigate(['/user']);


        }, (error) => {
          console.log(error);
        });

    } else {
      localStorage.clear();
      this.router.navigate(['/home']);
    }

  }

}


