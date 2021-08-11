import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Credentials } from '../../models/credential';
import { LoggedIn } from '../../models/loggedIn';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: LoggedIn = {
    loggedIn: false,
    token: ""
  };
  private login_url = "http://localhost:3300/login";

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  login(credentials: Credentials) {
    const body = {
      username: credentials.username,
      password: credentials.password
    }
    return this.http.post<LoggedIn>(this.login_url, body)
      .subscribe((res: LoggedIn) => {
        this.user = res;
        this.router.navigate(['quotation']);
      })
  }
  
  isLoggedIn() {
    return this.user.loggedIn;
  }
}
