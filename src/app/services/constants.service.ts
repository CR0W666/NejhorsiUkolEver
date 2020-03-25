import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {
  // tslint:disable-next-line:variable-name
  access_token = '';
  // tslint:disable-next-line:variable-name
  server_ip = 'http://85.160.64.233:3000/';
  constructor() { }
}
