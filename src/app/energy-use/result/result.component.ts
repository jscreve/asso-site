import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {FormDataService} from '../data/form-data.service';
import {FormDataModel} from '../data/form-data-model';
import {EnergyService} from '../../services/energy.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  public electricResult: number;
  public gazResult: number;
  public averageEnergy: number;
  private data: any;
  private dataModel: FormDataModel;

  constructor(private _fb: FormBuilder, private _energyService: EnergyService,
              private _formDataService: FormDataService, private _router: Router) {
  } // form builder simplify form initialization

  ngOnInit() {
    this.dataModel = new FormDataModel(this._formDataService.gazDataModel,
      this._formDataService.electricityDataModel,
      this._formDataService.homeDataModel);
    this.data = this._energyService.create(this.dataModel);
    this.data.subscribe(
      value => {
        this.electricResult = value.electricEnergyUsage;
        this.gazResult = value.gazEnergyUsage;
        this.averageEnergy = value.averageEnergy;
      },
      err => {
        console.log('Error occured.' + err);
      }
    );
  }

  onPrevious() {
    if (this.dataModel.homeDataModel.electricityAndGas === 'electricity') {
      this._router.navigate(['/electricity-energy-use']);
    } else {
      this._router.navigate(['/gaz-energy-use']);
    }
  }

  home() {
    this._router.navigate(['/home']);
  }
}
