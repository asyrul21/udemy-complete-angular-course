import { Action } from '@ngrx/store';
import { Recipe } from '../recipe.model';

export const SET_RECIPES = '[Recipes] SET RECIPES';
export class SetRecipes implements Action {
  readonly type = SET_RECIPES;

  constructor(public payload: Recipe[]) {}
}

export const FETCH_RECIPES = '[Recipes] FETCH RECIPES';
export class FetchRecipes implements Action {
  readonly type = FETCH_RECIPES;
}

export const ADD_RECIPE = '[Recipes] ADD RECIPE';
export class AddRecipe implements Action {
  readonly type = ADD_RECIPE;

  constructor(public payload: Recipe) {}
}

export const UPDATE_RECIPE = '[Recipes] UPDATE RECIPE';
export class updateRecipe implements Action {
  readonly type = UPDATE_RECIPE;

  constructor(public payload: { index: number; newRecipe: Recipe }) {}
}

export const DELETE_RECIPE = '[Recipes] DELETE RECIPE';
export class deleteRecipe implements Action {
  readonly type = DELETE_RECIPE;

  constructor(public payload: number) {}
}

export const STORE_RECIPES = '[Recipes] STORE RECIPES';
export class storeRecipes implements Action {
  readonly type = STORE_RECIPES;
}

export type RecipeActions =
  | SetRecipes
  | FetchRecipes
  | AddRecipe
  | updateRecipe
  | deleteRecipe
  | storeRecipes;
