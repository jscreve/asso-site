import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {FormDataService} from '../data/form-data.service';
import {ElectricityDataModel} from '../data/electricity-data-model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-electricity',
  templateUrl: './electricity.component.html',
  styleUrls: ['./electricity.component.scss']
})
export class ElectricityComponent implements OnInit {

  public myForm: FormGroup; // our model driven form
  public submitted: boolean; // keep track on whether form is submitted

  constructor(private _fb: FormBuilder, private formDataService: FormDataService, private _router: Router) {
    this.myForm = this.formDataService.energyForm.form.controls['electricity'];
  } // form builder simplify form initialization

  ngOnInit() {
  }

  onPrevious() {
    this._router.navigate(['/home-energy-use']);
  }

  save(electricityDataModel: ElectricityDataModel, isValid: boolean) {
    this.submitted = true; // set form submit to true
    this.formDataService.electricityDataModel = electricityDataModel;
    console.log(electricityDataModel);
    if (isValid) {
      if (this.formDataService.homeDataModel.electricityAndGas === 'electricity') {
        this._router.navigate(['/result']);
      } else {
        this._router.navigate(['/gaz-energy-use']);
      }
    }
  }
}
