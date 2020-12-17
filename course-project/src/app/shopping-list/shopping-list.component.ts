import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';
import { LoggingService } from '../logging.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  // providers: [ShoppingListService]
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[] = [];

  ingredientsChangedSub: Subscription;

  constructor(
    private SLService: ShoppingListService,
    private loggingService: LoggingService
  ) {}

  ngOnInit(): void {
    this.ingredients = this.SLService.getIngredients();
    this.ingredientsChangedSub = this.SLService.ingredientsChanged.subscribe(
      (ingArray: Ingredient[]) => {
        this.ingredients = ingArray;
      }
    );
    this.loggingService.printLog(
      'Hello from Shopping List Component NgOnInit!'
    );
  }

  ngOnDestroy() {
    this.ingredientsChangedSub.unsubscribe();
  }

  onEditItem(index: number) {
    this.SLService.startedEditing.next(index);
  }
}
