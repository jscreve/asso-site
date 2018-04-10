import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import * as moment from 'moment';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

const API_URL = environment.apiUrl;
const TOKEN_KEY = 'AuthToken';
const EXPIRE_KEY = 'ExpiresAt';

@Injectable()
export class AuthService {

  private subject: BehaviorSubject<boolean>;

  constructor(private http: HttpClient) {
  }

  // get token
  attemptAuth(ussername: string, password: string): Observable<any> {
    const credentials = {username: ussername, password: password};
    console.log('attempAuth ::');
    return this.http.post(API_URL + '/users/generate-token', credentials);
  }

  // logged in functions
  public isLoggedIn() {
    return this.getExpiration() != null && moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiresAt = moment(this.getTokenExpiration(), 'YYYY-MM-DD HH:mm:ss');
    if (expiresAt == null) {
      return null;
    } else {
      return moment(expiresAt);
    }
  }

  sendLoggedStatus(logged: boolean) {
    this.subject.next(logged);
  }

  subscribeLoggedStatus(): Observable<boolean> {
    // init first value by checking expiration date
    this.subject = new BehaviorSubject<boolean>(this.isLoggedIn());
    return this.subject.asObservable();
  }

  // session storage
  public signOut() {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.removeItem(EXPIRE_KEY);
    window.sessionStorage.clear();
    this.sendLoggedStatus(false);
  }

  public saveToken(token: string, expiresAt: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
    window.sessionStorage.setItem(EXPIRE_KEY, expiresAt);
    this.sendLoggedStatus(true);
  }

  public getToken(): string {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public getTokenExpiration(): string {
    if (window.sessionStorage.getItem(EXPIRE_KEY) != null) {
      return window.sessionStorage.getItem(EXPIRE_KEY);
    } else {
      return null;
    }
  }
}
