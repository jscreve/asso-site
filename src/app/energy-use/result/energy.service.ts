import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {FormDataModel} from '../data/form-data-model';
import {environment} from '../../../environments/environment';

const API_URL = environment.apiUrl;

@Injectable()
export class EnergyService {

  constructor(@Inject(HttpClient) private httpClient: HttpClient) {
  }

  public create(energy: FormDataModel): Observable<any> {
    return this.httpClient.post<any>(API_URL + '/energy/usage', energy);
  }
}
