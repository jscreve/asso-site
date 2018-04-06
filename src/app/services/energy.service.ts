import {Inject, Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {FormDataModel} from '../energy-use/data/form-data-model';

const API_URL = environment.apiUrl;

@Injectable()
export class EnergyService {

  constructor(@Inject(HttpClient) private httpClient: HttpClient) {
  }

  public create(energy: FormDataModel): Observable<any> {
    return this.httpClient.post<any>(API_URL + '/energy/usage', energy);
  }
}
