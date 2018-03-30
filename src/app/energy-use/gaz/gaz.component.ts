import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {FormDataService} from '../data/form-data.service';
import {GazDataModel} from '../data/gaz-data-model';

@Component({
  selector: 'app-gaz',
  templateUrl: './gaz.component.html',
  styleUrls: ['./gaz.component.scss']
})
export class GazComponent implements OnInit {

  public myForm: FormGroup; // our model driven form
  public submitted: boolean; // keep track on whether form is submitted

  constructor(private _fb: FormBuilder, private formDataService: FormDataService, private _router: Router) {
    this.myForm = this.formDataService.energyForm.form.controls['gaz'];
  } // form builder simplify form initialization

  ngOnInit() {
  }

  onPrevious() {
    this._router.navigate(['/electricity-energy-use']);
  }

  save(gazDataModel: GazDataModel, isValid: boolean) {
    this.submitted = true; // set form submit to true
    this.formDataService.gazDataModel = gazDataModel;
    console.log(gazDataModel);
    if (isValid) {
      this._router.navigate(['/result']);
    }
  }
}
