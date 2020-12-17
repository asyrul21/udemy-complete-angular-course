import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  user: { id: number, name: string };

  // to store subscriptions and destroy (optional: Angular does this BTS)
  paramsSubscription: Subscription;

  constructor(private currentRoute: ActivatedRoute) { }

  ngOnInit() {
    this.user = {
      id: this.currentRoute.snapshot.params['id'],
      name: this.currentRoute.snapshot.params['name']
    }
    // Observable
    this.paramsSubscription = this.currentRoute.params.subscribe(
      (params: Params) => {
        this.user.id = params['id']
        this.user.name = params['name']
      }
    );
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }

}
