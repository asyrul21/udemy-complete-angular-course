import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// forms
import { FormsModule } from '@angular/forms';

// for http
import { HttpClientModule } from '@angular/common/http';

// ngrx and redux
import { StoreModule } from '@ngrx/store';

// routing
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
// import { RecipesModule } from './recipes/recipes.module';
// import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';
import { LoggingService } from './logging.service';
import { shoppingListReducer } from './shopping-list/store/shopping-list.reducer';
// import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    // RecipesModule, // feature module // moved to app-routing.module to enable lazy loading
    // ShoppingListModule, // feature module
    // AuthModule,
    SharedModule,
    CoreModule,
    StoreModule.forRoot({ shoppingList: shoppingListReducer }),
  ],
  bootstrap: [AppComponent],
  providers: [LoggingService],
})
export class AppModule {}
