import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {ContactsComponent} from './contacts/contacts.component';
import {MoneyComponent} from './money/money.component';
import {ActivitiesComponent} from './activities/activities.component';
import {ElectricityComponent} from './energy-use/electricity/electricity.component';
import {GazComponent} from './energy-use/gaz/gaz.component';
import {HomeInfosComponent} from './energy-use/home-infos/home-infos.component';
import {ResultComponent} from './energy-use/result/result.component';
import {LoginComponent} from './login/login.component';
import {AdminComponent} from './admin/admin.component';
import {AboutusComponent} from './aboutus/aboutus.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'home-energy-use', component: HomeInfosComponent},
  {path: 'electricity-energy-use', component: ElectricityComponent},
  {path: 'gaz-energy-use', component: GazComponent},
  {path: 'result', component: ResultComponent},
  {path: 'money', component: MoneyComponent},
  {path: 'contacts', component: ContactsComponent},
  {path: 'activities', component: ActivitiesComponent},
  {path: 'login', component: LoginComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'aboutus', component: AboutusComponent},
];

@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot(routes)
  ],
})
export class AppRoutingModule {
}



