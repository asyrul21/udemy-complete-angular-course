import { Action } from '@ngrx/store';
import { Ingredient } from 'src/app/shared/ingredient.model';

// usualy done in action types in react
export const ADD_INGREDIENT = '[Shopping List] ADD_INGREDIENT';
export class AddIngredient implements Action {
  readonly type = ADD_INGREDIENT;
  // payload: Ingredient;

  constructor(public payload: Ingredient) {}
}

export const ADD_INGREDIENTS = '[Shopping List] ADD_INGREDIENTS';
export class AddIngredients implements Action {
  readonly type = ADD_INGREDIENTS;
  // payload: Ingredient;

  constructor(public payload: Ingredient[]) {}
}

export const UPDATE_INGREDIENT = '[Shopping List] UPDATE_INGREDIENT';
export class UpdateIngredient implements Action {
  readonly type = UPDATE_INGREDIENT;
  // payload: Ingredient;

  constructor(public payload: Ingredient) {}
}

export const DELETE_INGREDIENT = '[Shopping List] DELETE_INGREDIENT';
export class DeleteIngredient implements Action {
  readonly type = DELETE_INGREDIENT;
}

export const START_EDIT = '[Shopping List] START_EDIT';
export class StartEdit implements Action {
  readonly type = START_EDIT;
  constructor(public payload: number) {}
}

export const STOP_EDIT = '[Shopping List] STOP_EDIT';
export class StopEdit implements Action {
  readonly type = STOP_EDIT;
}

export type ShoppingListActions =
  | AddIngredient
  | AddIngredients
  | UpdateIngredient
  | DeleteIngredient
  | StartEdit
  | StopEdit;
