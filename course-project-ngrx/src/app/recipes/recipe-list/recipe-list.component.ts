import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  //array of Recipe objects
  recipes: Recipe[];

  sub = new Subscription();

  // @Output() recipeSelected = new EventEmitter<Recipe>();

  constructor(
    // private recipeService: RecipeService,
    private router: Router,
    private currentRoute: ActivatedRoute,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    // this.sub = this.recipeService.recipesChanged.subscribe(
    //   (recipes: Recipe[]) => {
    //     this.recipes = recipes;
    //   }
    // );
    // this.recipes = this.recipeService.getRecipes();

    this.sub = this.store
      .select('recipes')
      .pipe(
        map((recipeState) => {
          return recipeState.recipes;
        })
      )
      .subscribe((recipes: Recipe[]) => {
        this.recipes = recipes;
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onClickNew() {
    this.router.navigate(['new'], { relativeTo: this.currentRoute });
  }

  // onRecipeSelected(recipe: Recipe) {
  //   // this.recipeSelected.emit(recipe);
  // }
}
