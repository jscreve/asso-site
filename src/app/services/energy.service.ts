import {Inject, Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {ComputedEnergyUseModel} from '../models/computed-energy-use-model';
import {FormDataModel} from '../energy-use/data/form-data-model';

const API_URL = environment.apiUrl;

@Injectable()
export class EnergyService {

  constructor(@Inject(HttpClient) private httpClient: HttpClient) {
  }

  public create(energy: FormDataModel): Observable<ComputedEnergyUseModel> {
    return this.httpClient.post<ComputedEnergyUseModel>(API_URL + '/energy/usage', energy);
  }
}
