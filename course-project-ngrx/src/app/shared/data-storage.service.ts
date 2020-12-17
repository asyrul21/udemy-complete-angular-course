import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';

import { map, tap, take, exhaustMap } from 'rxjs/operators'
import { AuthService } from '../auth/auth.service';

@Injectable({
    providedIn: 'root'
})
export class DataStorageService {

    constructor(
        private http: HttpClient,
        private recipeService: RecipeService,
        private AuthService: AuthService
    ) { }

    // approach 1
    // storeRecipes(recipes: Recipe[]) {}

    // approach 2
    storeRecipes() {
        const recipes = this.recipeService.getRecipes();

        this.http.put<Recipe[]>('https://udemy-angular-course-pro-dd0c4.firebaseio.com/recipes.json', recipes)
            .subscribe((response) => {
                console.log(response);
            });
    }


    fetchRecipes() {
        return this.http.get<Recipe[]>(
            'https://udemy-angular-course-pro-dd0c4.firebaseio.com/recipes.json',
        ).pipe(
            map((recipes) => {
                return recipes.map((recipe) => {
                    return {
                        ...recipe,
                        ingredients: recipe.ingredients ? recipe.ingredients : []
                    }
                })
            }),
            tap((recipes) => {
                this.recipeService.setRecipes(recipes)
            })
        )
    }
}