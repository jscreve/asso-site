import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {PageScrollConfig} from 'ngx-page-scroll';
import {AuthService} from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'app';
  public isLoggedUser$: Observable<boolean>;
  public loggedUser$: Observable<string>;
  public userRoles$: Observable<string[]>;

  constructor(private authService: AuthService) {
    PageScrollConfig.defaultScrollOffset = 70;
    PageScrollConfig.defaultDuration = 250;
  }

  ngOnInit() {
    // init log status
    this.isLoggedUser$ = this.authService.subscribeLoggedStatus();
    this.loggedUser$ = this.authService.subscribeLoggedUser();
    this.userRoles$ = this.authService.subscribeUserRoles();
  }

  ngOnDestroy() {
    // Only need to unsubscribe if its a multi event Observable
  }

  logout() {
    this.authService.signOut();
  }
}
