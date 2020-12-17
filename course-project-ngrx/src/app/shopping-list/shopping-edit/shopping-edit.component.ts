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
  editedItemIndex: number;
  edittedItem: Ingredient;

  constructor(
    private SLservice: ShoppingListService,
    private store: Store<{ shoppingList: { ingredients: Ingredient[] } }> // ngrx redux - connecting to the ingredients state
  ) {}

  ngOnInit(): void {
    this.subscription = this.SLservice.startedEditing.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editedItemIndex = index;
        this.edittedItem = this.SLservice.getIngredient(index);
        this.slForm.setValue({
          name: this.edittedItem.name,
          amount: this.edittedItem.amount,
        });
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSubmit(form: NgForm) {
    // this.ingredientAdded.emit({
    //   name: nameInput.value,
    //   amount: this.amount.nativeElement.value
    // })

    const value = form.value;
    let ing = new Ingredient(value.name, value.amount);

    if (this.editMode) {
      this.SLservice.updateIngredient(this.editedItemIndex, ing);
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
  }

  onDelete() {
    // if (this.editMode) {
    //   this.SLservice.deleteIngredient(this.editedItemIndex);
    // }
    // OR then set conditional in html file

    this.SLservice.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }
}
