import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Data, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  // @Input() selectedRecipe: Recipe;
  selectedRecipe: Recipe;
  clickedManage: boolean = false;
  id: number;

  constructor(private recipeService: RecipeService, private currentRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    // console.log(this.currentRoute.snapshot.params);
    // const id = +this.currentRoute.snapshot.params['id'];
    // this.selectedRecipe = this.recipeService.getRecipe(id);

    // must subsribe to listen to changes
    // if method below is implemented, the method above is not needed
    this.currentRoute.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.selectedRecipe = this.recipeService.getRecipe(+params['id']);
    });
  }

  onClickEdit() {
    // this.router.navigate(['edit'], { relativeTo: this.currentRoute })
    // not necessary, but only for demo purposes
    this.router.navigate(['../', this.id, 'edit'], { relativeTo: this.currentRoute });
  }

  // alternative approach
  // onClickToShoppingList() {
  //   this.selectedRecipe.ingredients.map((ing) => {
  //     this.SLservice.addIngredient(ing);
  //   })
  // }

  onClickToShoppingList() {
    console.log(this.selectedRecipe.ingredients);

    this.recipeService.addIngredientToShoppingList(this.selectedRecipe.ingredients);
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }
}
