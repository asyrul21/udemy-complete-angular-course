import {
  Component,
  ComponentFactoryResolver,
  ViewChild,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  // Programmatic Creation of Dynamic Components
  @ViewChild(PlaceholderDirective, { static: false })
  alertHost: PlaceholderDirective;
  private closeSub: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    // using ngrx implementation
    this.store.select('auth').subscribe((authState) => {
      this.isLoading = authState.loading;
      this.error = authState.authError;
      if (this.error) {
        this.showErrorAlert(this.error);
      }
    });
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    // console.log(form.value);

    // check
    if (!form.valid) {
      return;
    }

    this.isLoading = true;
    const email = form.value.email;
    const password = form.value.password;

    let AuthObs: Observable<AuthResponseData>;

    if (this.isLoginMode) {
      // AuthObs = this.authService.login(email, password);

      // use ngrx redux and effects
      this.store.dispatch(
        new AuthActions.LoginStart({ email: email, password: password })
      );
    } else {
      AuthObs = this.authService.signUp(email, password);
    }

    // AuthObs.subscribe(
    //   (responseData) => {
    //     console.log(responseData);
    //     this.isLoading = false;
    //     // success case
    //     this.router.navigate(['/recipes']);
    //   },
    //   (errorMessage) => {
    //     console.log('Error:');
    //     console.log(errorMessage);
    //     this.error = errorMessage;
    //     this.showErrorAlert(errorMessage);
    //     this.isLoading = false;
    //   }
    // );

    form.reset();
  }

  onHandleError() {
    this.error = null;
  }

  // Programmtic Creation of Dynamic Components
  private showErrorAlert(message: string) {
    // const alertCmp = new AlertComponent(); // wont work

    // Angular will create for you using ComponentFacturyResolver
    // passing the type as argument
    // returns the component FACTORY
    const alertCpmFactory = this.componentFactoryResolver.resolveComponentFactory(
      AlertComponent
    );
    const hostViewContainerRef = this.alertHost.viewContainerRef;

    // clear everything before rendering something new
    hostViewContainerRef.clear();

    // create component using the factory
    const componentRef = hostViewContainerRef.createComponent(alertCpmFactory);

    // data binding
    componentRef.instance.message = message;

    // listening to event
    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }

  ngOnDestroy() {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }
}

// https://firebase.google.com/docs/reference/rest/auth
