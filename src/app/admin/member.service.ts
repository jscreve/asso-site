import {Inject, Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {MemberResource} from './member.resource.component';

const API_URL = environment.apiUrl;

@Injectable()
export class MemberService {

  constructor(@Inject(HttpClient) private httpClient: HttpClient) {
  }

  public getMembers(): Observable<MemberResource[]> {
    return this.httpClient.get<MemberResource[]>(API_URL + '/member/fetch');
  }
}
