import { Ingredient } from '../shared/ingredient.model';
import { EventEmitter } from '@angular/core';

// using subjects instead of event emitter
import { Subject } from 'rxjs'

export class ShoppingListService {

    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10)
    ];
    // ingredientsChanged = new EventEmitter<Ingredient[]>();
    // ingredientAdded = new EventEmitter<Ingredient>();

    // use subject
    ingredientsChanged = new Subject<Ingredient[]>();
    // ingredientAdded = new Subject<Ingredient>();
    startedEditing = new Subject<number>();

    getIngredients() {
        // return a copy of the array
        return this.ingredients.slice();
    }

    getIngredient(index: number) {
        return this.ingredients[index];
    }

    addIngredient(ing: Ingredient) {
        // push to original array
        this.ingredients.push(ing);
        // inform Angular that original has changed
        // this.ingredientsChanged.emit(this.ingredients.slice());
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    addIngredients(ings: Ingredient[]) {
        // ings.map((ing) => {
        //     this.ingredients.push(ing);
        // });

        // spread operator
        this.ingredients.push(...ings);
        // this.ingredientsChanged.emit(this.ingredients.slice());
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    updateIngredient(index: number, newIngredient: Ingredient) {
        this.ingredients[index] = newIngredient;
        // update changes
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    deleteIngredient(index: number) {
        // let newingredients = this.ingredients.filter((ing, idx) => {
        //     return idx !== index
        // }); 
        // this.ingredients = newingredients;
        // OR

        this.ingredients.splice(index, 1);
        // update changes
        this.ingredientsChanged.next(this.ingredients.slice());
    }
}