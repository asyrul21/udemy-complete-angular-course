import { Component, OnInit, OnDestroy } from '@angular/core';

import { interval, Subscription, Observable } from 'rxjs';
//  to enable pipe
import { map, filter } from 'rxjs/operators'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  // store subscriptions
  private firstObsSubscription: Subscription;

  constructor() { }

  // Observables are from RXJS
  ngOnInit() {
    // this.firstObsSubscription = interval(1000).subscribe((count) => {
    //   console.log(count);
    // })

    // creating custom observable
    const customIntervalObservable = Observable.create((observer) => {
      let count = 0;
      setInterval(() => {
        // next executes the call back function passed in .subscribe()
        observer.next(count);
        if (count === 2) {
          // observer completion
          observer.complete();
        }
        if (count > 3) {
          // error handling
          // error cancels completion
          observer.error(new Error('Count is greater than 3!'))
        }
        count++;
      }, 1000)
    });

    // this.firstObsSubscription = customIntervalObservable.subscribe(data => {
    //   console.log(data);
    // },
    //   // error handling
    //   error => {
    //     console.log(error);
    //     alert(error.message);
    //   },
    //   // completion handling
    //   () => {
    //     console.log('Completed!');

    //   }
    // )

    // operators
    // customIntervalObservable.pipe(map((data: number) => {
    //   return 'Round ' + (data + 1);
    // }));

    // implementing operator pipes
    this.firstObsSubscription = customIntervalObservable.pipe(filter(data => {
      // filter returns true or false condition
      return data > 0;
    }), map((data: number) => {
      return 'Round ' + (data + 1);
    })).subscribe(data => {
      console.log(data);
    },
      // error handling
      error => {
        console.log(error);
        alert(error.message);
      },
      // completion handling
      () => {
        console.log('Completed!');

      }
    )
  }

  ngOnDestroy() {
    this.firstObsSubscription.unsubscribe();
  }

}
