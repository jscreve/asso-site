import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {SignUpRessource} from '../resources/signup-model';
import {MemberResource} from '../resources/member.resource.component';
import {MemberResourceUpdate} from '../resources/member.resource.update.component';

const API_URL = environment.apiUrl;
const TOKEN_KEY = 'AuthToken';
const EXPIRE_KEY = 'ExpiresAt';
const USERNAME_KEY = 'Username';
const ROLES_KEY = 'Authorities';

@Injectable()
export class UserService {

  private loggedSubject: BehaviorSubject<boolean>;
  private loggedUser: BehaviorSubject<string>;
  private userRoles: BehaviorSubject<string[]>;

  constructor(private http: HttpClient) {
  }

  public signUp(signupResource: SignUpRessource): Observable<any> {
    console.log('signing up ::');
    return this.http.post(API_URL + '/members/sign-up', signupResource);
  }

  public remove(username: string): Observable<any> {
    console.log('removing user ::');
    return this.http.delete(API_URL + '/members/remove/' + username);
  }

  public getMembersAndPayments(): Observable<MemberResource[]> {
    return this.http.get<MemberResource[]>(API_URL + '/members/fetchAllMemberAndPayments');
  }

  public get(): Observable<MemberResource> {
    console.log('get user infos::');
    return this.http.get<MemberResource>(API_URL + '/members/fetch');
  }

  public update(resource: MemberResourceUpdate): Observable<any> {
    console.log('update user infos::');
    return this.http.post(API_URL + '/members/update', resource);
  }
}
