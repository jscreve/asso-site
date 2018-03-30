import {inject, TestBed} from '@angular/core/testing';

import {HttpClient, HttpClientModule} from '@angular/common/http';
import {AppModule} from '../app.module';
import {APP_BASE_HREF} from '@angular/common';
import {EnergyService} from './energy.service';
import {EnergyUseDataModel} from '../energy-use/data/energy-use-data-model';


describe('EnergyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule, AppModule
      ],
      providers: [{provide: APP_BASE_HREF, useValue: '/'}, EnergyService, HttpClient]
    });
  });

  /*it('should be created', inject([EnergyService], (service: EnergyService) => {
    expect(service).toBeTruthy();
  }));*/

  it('should automatically assign an incrementing id', inject([EnergyService], (service: EnergyService) => {
    const energyUse = new EnergyUseDataModel();
    // fill up object
    this.data = service.create(energyUse);
    this.data.subscribe(
      value => expect(value.energyUsage).toEqual(2644),
      err => {
        console.log('Error occured.' + err);
      }
    );
  }));
});

