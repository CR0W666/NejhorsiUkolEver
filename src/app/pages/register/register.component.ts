import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ConstantsService } from '../../services/constants.service';;
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  // tslint:disable-next-line:variable-name
  constructor(private httpClient: HttpClient, private router: Router, private _constant: ConstantsService) {
    this.httpClient = httpClient;

  }
  username;
  email;
  password;
  passconf;

  sendReg() {
    console.log(this.email, this.username, this.password, this.passconf);


    const body = {
      email: this.email,
      username: this.username,
      password: this.password,
      password_confirmation: this.passconf
    };

    const url = this._constant.server_ip + 'session/register';

    this.httpClient
      .post(url, body)
      .subscribe(() => {
        this.router.navigate(['/login']);
      }, (error) => {

        console.log(error);
      });
  }

  ngOnInit(): void {
  }

}
