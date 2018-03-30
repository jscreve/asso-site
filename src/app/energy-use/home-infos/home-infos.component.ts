import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {FormDataService} from '../data/form-data.service';
import {HomeDataModel} from '../data/home-data-model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home-infos',
  templateUrl: './home-infos.component.html',
  styleUrls: ['./home-infos.component.scss']
})
export class HomeInfosComponent implements OnInit {

  public myForm: FormGroup; // our model driven form
  public submitted: boolean; // keep track on whether form is submitted
  public events: any[] = []; // use later to display form changes

  constructor(private _fb: FormBuilder, private formDataService: FormDataService, private _router: Router) {
    this.myForm = this.formDataService.energyForm.form.controls['home'];
  } // form builder simplify form initialization

  ngOnInit() {
  }

  save(homeDataModel: HomeDataModel, isValid: boolean) {
    this.submitted = true;
    this.formDataService.homeDataModel = homeDataModel;
    console.log(homeDataModel);
    if (isValid) {
      this._router.navigate(['/electricity-energy-use']);
    }
  }
}
