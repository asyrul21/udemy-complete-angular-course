import { Component, OnInit } from '@angular/core';
// import { RecipeService } from './recipe.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  // selectedRecipe: Recipe;

  constructor() { }

  ngOnInit(): void {
    // this.recipeService.recipeSelected.subscribe((recipe: Recipe) => {
    //   this.selectedRecipe = recipe;
    // })
    // console.log(this.currentRouter.snapshot.queryParams);

  }

}
