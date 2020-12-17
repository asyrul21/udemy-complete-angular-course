import { Action } from '@ngrx/store';
import { Ingredient } from 'src/app/shared/ingredient.model';

// usualy done in action types in react
export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export class AddIngredient implements Action {
  readonly type = ADD_INGREDIENT;
  // payload: Ingredient;

  constructor(public payload: Ingredient) {}
}

export const ADD_INGREDIENTS = 'ADD_INGREDIENTS';
export class AddIngredients implements Action {
  readonly type = ADD_INGREDIENTS;
  // payload: Ingredient;

  constructor(public payload: Ingredient[]) {}
}

export type ShoppingListActions = AddIngredient | AddIngredients;
