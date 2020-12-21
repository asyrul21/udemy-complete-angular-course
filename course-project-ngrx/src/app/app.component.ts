import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from './auth/auth.service';
import { LoggingService } from './logging.service';
import * as fromApp from './store/app.reducer';
import * as AuthActions from './auth/store/auth.actions';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    // private authService: AuthService,
    private loggingService: LoggingService,

    // use ngrx redux store
    private store: Store<fromApp.AppState>,

    // angular universal
    @Inject(PLATFORM_ID) private platformId
  ) {}

  ngOnInit() {
    // this.authService.autoLogin();
    this.loggingService.printLog('Hello from App Component NgOnInit!');
    if (isPlatformBrowser(this.platformId)) {
      this.store.dispatch(new AuthActions.AutoLogin());
    }
  }
}
