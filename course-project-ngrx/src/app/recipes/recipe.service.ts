import { Recipe } from './recipe.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';
import * as fromApp from '../store/app.reducer';

@Injectable()
export class RecipeService {
  constructor(
    private SLService: ShoppingListService,
    private store: Store<fromApp.AppState>
  ) {}

  //array of Recipe objects
  // private recipes: Recipe[] = [
  //     new Recipe('A Test Recipe 1', 'This is just a test 1', 'https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/spaghetti-puttanesca_1.jpg',
  //         [
  //             new Ingredient('Meat', 1),
  //             new Ingredient('French Fries', 20)
  //         ]),
  //     new Recipe('A Test Recipe 2', 'This is just a test 2', 'https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/chorizo-mozarella-gnocchi-bake-cropped.jpg',
  //         [
  //             new Ingredient('Buns', 5),
  //             new Ingredient('Meat', 1)
  //         ])
  // ];
  private recipes: Recipe[] = [];

  // recipeSelected = new EventEmitter<Recipe>();
  recipesChanged = new Subject<Recipe[]>();

  getRecipes() {
    // get a copy of array
    return this.recipes.slice();
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    // notify changes
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  addIngredientToShoppingList(ingredients: Ingredient[]) {
    // this.SLService.addIngredients(ingredients);

    // use ngrx redux
    this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);

    // update changes
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;

    // update changes
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);

    // update changes
    this.recipesChanged.next(this.recipes.slice());
  }
}
