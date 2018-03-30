import {FormBuilder, FormGroup, Validators} from '@angular/forms';

export class EnergyUseDataForm {

  public form: FormGroup;

  constructor(fb: FormBuilder) {
    this.form = fb.group({
      home: fb.group({
        appartmentSize: [null, [<any>Validators.required]],
        inhabitants: [1, [<any>Validators.required]],
        electricityAndGas: ['electricity', [<any>Validators.required]],
      }),
      electricity: fb.group({
        electricHeating: ['', []],
        electricBoiler: ['', []],
        electricCooking: ['', []],
        electricOven: ['', []],
        microWaveOven: ['', []],
        iron: ['', []],
        vacuum: ['', []],
        hairDryer: ['', []],
        fridge: ['0', [<any>Validators.required]],
        TV: ['0', [<any>Validators.required]],
        dishWasher: ['0', [<any>Validators.required]],
        tumbleDryer: ['0', [<any>Validators.required]],
        washingMachine: ['0', [<any>Validators.required]],
        PCs: ['0', [<any>Validators.required]],
        knownkWhPerYear: ['', []]
      }),
      gaz: fb.group({
        gazHeating: ['', []],
        gazWaterHeating: ['', []],
        gazCooking: ['', []],
        knownkWhPerYear: ['', []]
      })
    });
  }
}


