import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Data, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as RecipeActions from '../store/recipe.actions';
import * as ShoppingLisActions from '../../shopping-list/store/shopping-list.actions';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  // @Input() selectedRecipe: Recipe;
  selectedRecipe: Recipe;
  clickedManage: boolean = false;
  id: number;

  constructor(
    private recipeService: RecipeService,
    private currentRoute: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    // console.log(this.currentRoute.snapshot.params);
    // const id = +this.currentRoute.snapshot.params['id'];
    // this.selectedRecipe = this.recipeService.getRecipe(id);

    // must subsribe to listen to changes
    // if method below is implemented, the method above is not needed
    this.currentRoute.params
      .pipe(
        map((params) => {
          return +params['id'];
        }),
        switchMap((id) => {
          this.id = id;
          return this.store.select('recipes');
        }),
        map((recipeState) => {
          return recipeState.recipes.find((recipe, index) => {
            return index === this.id;
          });
        })
      )
      .subscribe((recipe) => {
        this.selectedRecipe = recipe;
      });
  }

  onClickEdit() {
    // this.router.navigate(['edit'], { relativeTo: this.currentRoute })
    // not necessary, but only for demo purposes
    this.router.navigate(['../', this.id, 'edit'], {
      relativeTo: this.currentRoute,
    });
  }

  // alternative approach
  // onClickToShoppingList() {
  //   this.selectedRecipe.ingredients.map((ing) => {
  //     this.SLservice.addIngredient(ing);
  //   })
  // }

  onClickToShoppingList() {
    // this.recipeService.addIngredientToShoppingList(
    //   this.selectedRecipe.ingredients
    // );

    this.store.dispatch(
      new ShoppingLisActions.AddIngredients(this.selectedRecipe.ingredients)
    );
  }

  onDeleteRecipe() {
    // this.recipeService.deleteRecipe(this.id);

    this.store.dispatch(new RecipeActions.deleteRecipe(this.id));
    this.router.navigate(['/recipes']);
  }
}
