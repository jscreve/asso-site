import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EnergyUseComponent} from './energy-use/energy-use.component';
import {HomeComponent} from './home/home.component';
import {ContactsComponent} from './contacts/contacts.component';
import {MoneyComponent} from './money/money.component';
import {ActivitiesComponent} from './activities/activities.component';


const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'energy-use', component: EnergyUseComponent},
  {path: 'money', component: MoneyComponent},
  {path: 'contacts', component: ContactsComponent},
  {path: 'activities', component: ActivitiesComponent},
];

@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot(routes)
  ],
})
export class AppRoutingModule {
}



