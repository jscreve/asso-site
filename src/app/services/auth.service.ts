import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import * as moment from 'moment';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

const API_URL = environment.apiUrl;
const TOKEN_KEY = 'AuthToken';
const EXPIRE_KEY = 'ExpiresAt';
const USERNAME_KEY = 'Username';
const ROLES_KEY = 'Authorities';

@Injectable()
export class AuthService {

  private loggedSubject: BehaviorSubject<boolean>;
  private loggedUser: BehaviorSubject<string>;
  private userRoles: BehaviorSubject<string[]>;

  constructor(private http: HttpClient) {
  }

  // get token
  public attemptAuth(ussername: string, password: string): Observable<any> {
    const credentials = {username: ussername, password: password};
    console.log('attempAuth ::');
    return this.http.post(API_URL + '/auth/generate-token', credentials);
  }

  // logged in functions
  public isLoggedIn() {
    return this.getExpiration() != null && moment().isBefore(this.getExpiration());
  }

  public getLoggedUser() {
    return window.sessionStorage.getItem(USERNAME_KEY);
  }

  public isLoggedOut() {
    return !this.isLoggedIn();
  }

  public getExpiration() {
    const expiresAt = moment(this.getTokenExpiration(), 'YYYY-MM-DD HH:mm:ss');
    if (expiresAt == null) {
      return null;
    } else {
      return moment(expiresAt);
    }
  }

  public sendLoggedStatus(logged: boolean, username: string, roles: string[]) {
    this.loggedSubject.next(logged);
    this.loggedUser.next(username);
    this.userRoles.next(roles);
  }

  public subscribeLoggedStatus(): Observable<boolean> {
    // init first value by checking expiration date
    this.loggedSubject = new BehaviorSubject<boolean>(this.isLoggedIn());
    return this.loggedSubject.asObservable();
  }

  public subscribeLoggedUser(): Observable<string> {
    // init first value by checking expiration date
    this.loggedUser = new BehaviorSubject<string>(this.getLoggedUser());
    return this.loggedUser.asObservable();
  }

  public subscribeUserRoles(): Observable<string[]> {
    // init first value by checking expiration date
    this.userRoles = new BehaviorSubject<string[]>(this.getRoles());
    return this.userRoles.asObservable();
  }

  // session storage
  public signOut() {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.removeItem(EXPIRE_KEY);
    window.sessionStorage.removeItem(USERNAME_KEY);
    window.sessionStorage.removeItem(ROLES_KEY);
    window.sessionStorage.clear();
    this.sendLoggedStatus(false, '', []);
  }

  public saveToken(token: string, expiresAt: string, username: string, authorities: string[]) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
    window.sessionStorage.setItem(EXPIRE_KEY, expiresAt);
    window.sessionStorage.setItem(USERNAME_KEY, username);
    window.sessionStorage.setItem(ROLES_KEY, authorities.join(','));
    this.sendLoggedStatus(true, username, authorities);
  }

  public getToken(): string {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public getRoles(): string[] {
    if (window.sessionStorage.getItem(ROLES_KEY) != null) {
      return window.sessionStorage.getItem(ROLES_KEY).split(',');
    } else {
      return [];
    }
  }

  public getTokenExpiration(): string {
    if (window.sessionStorage.getItem(EXPIRE_KEY) != null) {
      return window.sessionStorage.getItem(EXPIRE_KEY);
    } else {
      return null;
    }
  }
}
