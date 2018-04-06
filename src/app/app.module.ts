import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {MDBBootstrapModule} from 'angular-bootstrap-md';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {HomeComponent} from './home/home.component';
import {MoneyComponent} from './money/money.component';
import {ContactsComponent} from './contacts/contacts.component';
import {HttpClientJsonpModule, HttpClientModule} from '@angular/common/http';
import {PaymentModule} from './payments/payment/payment.module';
import {ActivitiesComponent} from './activities/activities.component';
import {EnergyService} from './services/energy.service';
import {EmailService} from './services/email.service';
import {ElectricityComponent} from './energy-use/electricity/electricity.component';
import {GazComponent} from './energy-use/gaz/gaz.component';
import {FormDataService} from './energy-use/data/form-data.service';
import {HomeInfosComponent} from './energy-use/home-infos/home-infos.component';
import {ResultComponent} from './energy-use/result/result.component';
import {FeedCardComponent} from './activities/feed-card/feed-card.component';
import {FeedService} from './services/feed-service.service';
import {MyCommonModule} from './my-common.module';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HomeInfosComponent,
    MoneyComponent,
    ContactsComponent,
    ActivitiesComponent,
    ElectricityComponent,
    GazComponent,
    ResultComponent,
    FeedCardComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    MDBBootstrapModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    PaymentModule,
    MyCommonModule,
    HttpClientJsonpModule
  ],
  providers: [EnergyService, FormDataService, EmailService, FeedService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
