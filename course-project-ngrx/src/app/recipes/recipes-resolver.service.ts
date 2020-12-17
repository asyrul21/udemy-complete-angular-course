import { Injectable } from '@angular/core'
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
import { DataStorageService } from '../shared/data-storage.service'
import { Recipe } from './recipe.model'
import { RecipeService } from './recipe.service';

@Injectable({
    providedIn: 'root'
})

export class RecipesResolverService implements Resolve<Recipe[]>{
    constructor(private dataStorageService: DataStorageService, private recipesService: RecipeService) { }

    // resolver subscribes to the observer for you
    // this resolver is so that the angular getches the data before rendering the page
    // prevents erros due to missing data upon page loading
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const recipes = this.recipesService.getRecipes();

        if (recipes.length === 0) {
            return this.dataStorageService.fetchRecipes();
        }
        else {
            return recipes;
        }

    }
}

// update app routing