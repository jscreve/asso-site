import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EnergyUseModel} from './energy-use-model';

@Component({
  selector: 'app-energy-use',
  templateUrl: './energy-use.component.html',
  styleUrls: ['./energy-use.component.scss']
})
export class EnergyUseComponent implements OnInit {

  public myForm: FormGroup; // our model driven form
  public submitted: boolean; // keep track on whether form is submitted
  public events: any[] = []; // use later to display form changes
  public specificUsageEnergyPerPerson: number[] = [1400, 1850, 2180, 2450, 2650];
  public cookingEnergyPerPerson: number[] = [175, 350, 525, 700, 875];
  public heatingEnergyPerPerson: number[] = [1275, 2200, 3300, 4200, 5250];
  public result: number;

  constructor(private _fb: FormBuilder) {
  } // form builder simplify form initialization

  ngOnInit() {
    // the short way
    this.myForm = this._fb.group({
      kWh_real: ['', [<any>Validators.required]],
      size: ['', [<any>Validators.required]],
      inhabitants: ['', [<any>Validators.required]],
      electrical_heating: ['', [<any>Validators.required]],
      electrical_cooking: ['', [<any>Validators.required]],
    });

    this.subcribeToFormChanges();

  }

  save(model: EnergyUseModel, isValid: boolean) {
    this.submitted = true; // set form submit to true

    this.result =
      this.specificUsageEnergyPerPerson[model.inhabitants] +
      this.cookingEnergyPerPerson[model.inhabitants] +
      this.heatingEnergyPerPerson[model.inhabitants] +
      model.size * 110;

    // check if model is valid
    // if valid, call API to save customer
    console.log(model, isValid);
  }

  subcribeToFormChanges() {
    // initialize stream
    const myFormValueChanges$ = this.myForm.valueChanges;

    // subscribe to the stream
    myFormValueChanges$.subscribe(x => this.events
      .push({event: 'STATUS CHANGED', object: x}));
  }

}
