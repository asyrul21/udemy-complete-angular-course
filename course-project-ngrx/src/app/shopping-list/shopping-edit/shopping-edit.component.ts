import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  OnDestroy,
} from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  // @Output() ingredientAdded = new EventEmitter<Ingredient>();

  // @ViewChild('amountInput') amount: ElementRef;

  //  editing ingredients
  @ViewChild('f', { static: false }) slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  // editedItemIndex: number;
  edittedItem: Ingredient;

  constructor(
    private SLservice: ShoppingListService,
    private store: Store<fromApp.AppState> // ngrx redux - connecting to the ingredients state
  ) {}

  ngOnInit(): void {
    // this.subscription = this.SLservice.startedEditing.subscribe(
    //   (index: number) => {
    //     this.editMode = true;
    //     this.editedItemIndex = index;
    //     this.edittedItem = this.SLservice.getIngredient(index);
    //     this.slForm.setValue({
    //       name: this.edittedItem.name,
    //       amount: this.edittedItem.amount,
    //     });
    //   }
    // );

    // using ngrx redux
    this.subscription = this.store
      .select('shoppingList')
      .subscribe((stateData) => {
        if (stateData.editedIngredientIndex > -1) {
          this.editMode = true;
          this.edittedItem = stateData.editedIngredient;
          this.slForm.setValue({
            name: this.edittedItem.name,
            amount: this.edittedItem.amount,
          });
        } else {
          this.editMode = false;
        }
      });
  }

  onSubmit(form: NgForm) {
    // this.ingredientAdded.emit({
    //   name: nameInput.value,
    //   amount: this.amount.nativeElement.value
    // })

    const value = form.value;
    let ing = new Ingredient(value.name, value.amount);

    if (this.editMode) {
      // this.SLservice.updateIngredient(this.editedItemIndex, ing);

      // ngrx redux
      this.store.dispatch(new ShoppingListActions.UpdateIngredient(ing));
    } else {
      // this.SLservice.addIngredient(ing);

      // use ngrx redux
      this.store.dispatch(new ShoppingListActions.AddIngredient(ing));
    }
    this.editMode = false;
    this.slForm.reset();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;

    // reset ngrx state
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

  onDelete() {
    // if (this.editMode) {
    //   this.SLservice.deleteIngredient(this.editedItemIndex);
    // }
    // OR then set conditional in html file

    // this.SLservice.deleteIngredient(this.editedItemIndex);

    //ngrx redux
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    // reset ngrx state
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }
}
