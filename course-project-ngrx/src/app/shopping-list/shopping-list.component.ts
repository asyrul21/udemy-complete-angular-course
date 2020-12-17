import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Observable, Subscription } from 'rxjs';
import { LoggingService } from '../logging.service';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  // providers: [ShoppingListService]
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  // ingredients: Ingredient[] = [];
  // to use store.select we need to assign the value as observable
  ingredients: Observable<{ ingredients: Ingredient[] }>;

  ingredientsChangedSub: Subscription;

  constructor(
    private SLService: ShoppingListService,
    private loggingService: LoggingService,
    private store: Store<{ shoppingList: { ingredients: Ingredient[] } }> // ngrx redux - connecting to the ingredients state
  ) {}

  ngOnInit(): void {
    // this.ingredients = this.SLService.getIngredients();
    // this.ingredientsChangedSub = this.SLService.ingredientsChanged.subscribe(
    //   (ingArray: Ingredient[]) => {
    //     this.ingredients = ingArray;
    //   }
    // );

    // ngrx implementation
    // returns an observable
    // call subscribe or user async pipe - see html file
    this.ingredients = this.store.select('shoppingList');
  }

  ngOnDestroy() {
    this.ingredientsChangedSub.unsubscribe();
  }

  onEditItem(index: number) {
    this.SLService.startedEditing.next(index);
  }
}
