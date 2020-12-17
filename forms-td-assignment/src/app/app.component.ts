import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('f', { static: false }) signupForm: NgForm;
  submitted = false;

  subscriptions = ['Basic', 'Advanced', 'Pro']
  defaultSub: string = "Advanced";
  user = {
    email: '',
    subscription: '',
    password: ''
  }

  onSubmit() {
    console.log('Submitted!');

    this.submitted = true;
    this.user.email = this.signupForm.value.email;
    this.user.subscription = this.signupForm.value.subscription;
    this.user.password = this.signupForm.value.pword;

    this.signupForm.reset();
  }



}
