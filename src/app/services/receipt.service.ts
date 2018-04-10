import {Inject, Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

const API_URL = environment.apiUrl;

@Injectable()
export class ReceiptService {

  constructor(@Inject(HttpClient) private httpClient: HttpClient) {
  }

  public get(year: number): Observable<any> {
    return this.httpClient.get<any>(API_URL + '/payment/receipt?year=' + year);
  }
}
