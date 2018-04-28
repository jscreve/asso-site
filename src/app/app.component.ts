import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from './services/auth.service';
import {Observable} from 'rxjs/Observable';
import {PageScrollConfig} from 'ngx-page-scroll';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'app';
  public loggedUser$: Observable<boolean>;

  constructor(private authService: AuthService) {
    PageScrollConfig.defaultScrollOffset = 70;
  }

  ngOnInit() {
    // init log status
    /*if (this.authService.isLoggedIn()) {
      this.loggedUser = true;
    } else {
      this.loggedUser = false;
    }*/
    // subscribe to log status change
    this.loggedUser$ = this.authService.subscribeLoggedStatus();
  }

  ngOnDestroy() {
    // Only need to unsubscribe if its a multi event Observable
  }
}
