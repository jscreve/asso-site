import {GazDataModel} from './gaz-data-model';
import {ElectricityDataModel} from './electricity-data-model';
import {HomeDataModel} from './home-data-model';

export class FormDataModel {

  constructor(gazDataModel, electricityDataModel, homeInfosDataModel) {
    this.gazDataModel = gazDataModel;
    this.electricityDataModel = electricityDataModel;
    this.homeDataModel = homeInfosDataModel;
  }

  public gazDataModel: GazDataModel;
  public electricityDataModel: ElectricityDataModel;
  public homeDataModel: HomeDataModel;
}



