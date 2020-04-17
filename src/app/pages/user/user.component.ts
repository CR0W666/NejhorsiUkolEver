import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Data } from 'src/app/data';
import { UserPage } from 'src/app/data';
import { Comment } from 'src/app/data';
import { User } from 'src/app/data';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ConstantsService } from '../../services/constants.service';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  IDToChange: string;
  private commentToChange: any;

  constructor(private httpClient: HttpClient, private route: ActivatedRoute,
              // tslint:disable-next-line:variable-name
              private router: Router, private _constant: ConstantsService) {
    this.httpClient = httpClient;
    // tslint:disable-next-line:max-line-length
    if (this._constant.access_token == null || this._constant.access_token === '') { this._constant.access_token = localStorage.getItem('User_Token'); }
    console.log('s ' + this._constant.access_token);
    this.access_token = new HttpHeaders().set('User_Token', this._constant.access_token);
  }

  // tslint:disable-next-line:variable-name
  access_token;
  // tslint:disable-next-line:variable-name
  user_id;
  // tslint:disable-next-line:variable-name
  user_email;
  username;
  comment;
  IDToDelete;
  displayMode = 'select';
  allComments = [];
  allUsers = [];

  // tslint:disable-next-line:variable-name
  mode(dMode) {
    // tslint:disable-next-line:max-line-length
    if (dMode === 'users') { this.displayMode = 'users'; } else if (dMode === 'comments') { this.displayMode = 'comments'; } else if (dMode === 'oldPanel') { this.displayMode = 'oldPanel'; }

  }
  postComment() {
    const url = this._constant.server_ip + 'comments/';
    const header = this.access_token;

    const body = {
      user_id: this.user_id,
      body: this.comment,
      author_id: {
        id: this.user_id,
        email: this.user_email,
        username: this.username
      }
    };
    this.httpClient
      .post<Data>(url, body, { headers: header, observe: 'response' })
      .subscribe((data) => {
        console.log(data);
      }, (error) => {
        console.log(error);
      });

  }

  editComment() {

    const url = this._constant.server_ip + 'comments/' + this.IDToChange;
    const header = this.access_token;
    this.httpClient
      .get<Comment>(url, { headers: header, observe: 'response' })
      .subscribe(
        data => {
          const body = {
            user_id: data.body.id,
            body: this.commentToChange,
            author_id: {
              id: this.user_id,
              email: this.user_email,
              username: this.username
            }
          };
          this.httpClient
            .put<Data>(url, body, {
              headers: header,
              observe: 'response'
            })
            .subscribe(error => {
              console.log(error);
            });
        },
        error => {
          console.log(error);
        }
      );
  }



  deleteComment() {
    const url = this._constant.server_ip + 'comments/' + this.IDToDelete;
    const header = this.access_token;
    this.httpClient
      .delete(url, { headers: header, observe: 'response' })
      .subscribe();
  }

  logOut() {
    const url = this._constant.server_ip + 'session/logout';
    const header = this.access_token;
    localStorage.clear();

    this.httpClient
      .delete(url, { headers: header, observe: 'response' })
      .subscribe((data) => {
        console.log(data);
        this.router.navigate(['/login']);
      }, (error) => {
        console.log(error);
      });
  }




  ngOnInit(): void {

    console.log('constants service' + this._constant.access_token);

    const url = this._constant.server_ip + 'user/';
    const body = this.access_token;
    this.httpClient
      .get<User>(url, { headers: body, observe: 'response' })
      .subscribe((data) => {
        this.user_email = data.body.email;
        this.user_id = data.body.id;
        this.username = data.body.username;

      }, (error) => {
        console.log(error);
      });



  }


  getUserPage(page) {
    const url = this._constant.server_ip + 'users?page=' + page;

    return this.httpClient.get<UserPage>(url, {
      headers: this.access_token,
      observe: 'response'
    });
  }

}
