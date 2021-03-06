import {Inject, Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {EmailDataModel} from './data/email-data-model';

const API_URL = environment.apiUrl;

@Injectable()
export class EmailService {

  constructor(@Inject(HttpClient) private httpClient: HttpClient) {
  }

  public create(mail: EmailDataModel): Observable<any> {
    return this.httpClient.post<null>(API_URL + '/mail/send', mail);
  }
}
