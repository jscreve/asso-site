import {Inject, Injectable} from '@angular/core';
import {ElectricityDataModel} from './electricity-data-model';
import {HomeDataModel} from './home-data-model';
import {EnergyUseDataForm} from './energy-use-data-form';
import {FormBuilder} from '@angular/forms';

@Injectable()
export class FormDataService {
  constructor(@Inject(FormBuilder) fb: FormBuilder) {
    this.energyForm = new EnergyUseDataForm(fb);
  }

  public electricityDataModel: ElectricityDataModel;
  public gazDataModel;
  GazDataModel;
  public homeDataModel: HomeDataModel;
  public energyForm;
}
