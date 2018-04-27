import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MDBBootstrapModule} from 'angular-bootstrap-md';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {HomeComponent} from './home/home.component';
import {MoneyComponent} from './money/money.component';
import {ContactsComponent} from './contacts/contacts.component';
import {HTTP_INTERCEPTORS, HttpClientJsonpModule, HttpClientModule} from '@angular/common/http';
import {PaymentModule} from './payments/payment/payment.module';
import {ActivitiesComponent} from './activities/activities.component';
import {EnergyService} from './energy-use/result/energy.service';
import {EmailService} from './contacts/email.service';
import {ElectricityComponent} from './energy-use/electricity/electricity.component';
import {GazComponent} from './energy-use/gaz/gaz.component';
import {FormDataService} from './energy-use/data/form-data.service';
import {HomeInfosComponent} from './energy-use/home-infos/home-infos.component';
import {ResultComponent} from './energy-use/result/result.component';
import {FeedCardComponent} from './activities/feed-card/feed-card.component';
import {FeedService} from './activities/feed-service.service';
import {MyCommonModule} from './my-common.module';
import {LoginComponent} from './login/login.component';
import {AuthService} from './services/auth.service';
import {Interceptor} from './security/app.interceptor';
import {AdminComponent} from './admin/admin.component';
import {AboutusComponent} from './aboutus/aboutus.component';
import {MemberComponent} from './member/member.component';
import {MemberService} from './admin/member.service';


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
    LoginComponent,
    AdminComponent,
    AboutusComponent,
    MemberComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    MDBBootstrapModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    PaymentModule,
    MyCommonModule,
    HttpClientJsonpModule,
    FormsModule
  ],
  providers: [EnergyService,
    AuthService,
    FormDataService,
    EmailService,
    MemberService,
    FeedService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
