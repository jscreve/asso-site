import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {MDBBootstrapModule} from 'angular-bootstrap-md';

import {AppComponent} from './app.component';
import {EnergyUseComponent} from './energy-use/energy-use.component';
import {AppRoutingModule} from './app-routing.module';
import {HomeComponent} from './home/home.component';
import {MoneyComponent} from './money/money.component';
import {ContactsComponent} from './contacts/contacts.component';
import {HttpClientModule} from '@angular/common/http';
import {PaymentModule} from './payments/payment/payment.module';
import {ActivitiesComponent} from './activities/activities.component';


@NgModule({
  declarations: [
    AppComponent,
    EnergyUseComponent,
    HomeComponent,
    MoneyComponent,
    ContactsComponent,
    ActivitiesComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    MDBBootstrapModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    PaymentModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
