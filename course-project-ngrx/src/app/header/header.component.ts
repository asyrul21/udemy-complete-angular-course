import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';


@Component({
    selector: "app-header",
    templateUrl: "./header.component.html"
})

export class HeaderComponent implements OnInit, OnDestroy {

    private userSub: Subscription;
    isAuthenticated = false;

    constructor(private dataStoreService: DataStorageService, private authService: AuthService) { }

    ngOnInit() {
        this.userSub = this.authService.user.subscribe(user => {
            // if not logged in user is null
            // this.isAuthenticated = !user ?
            //     false : true

            // shorthand of above
            this.isAuthenticated = !!user
        })
    }

    ngOnDestroy() {
        this.userSub.unsubscribe()
    }

    onSaveData() {
        this.dataStoreService.storeRecipes()
    }

    onFetchData() {
        this.dataStoreService.fetchRecipes().subscribe();
    }

    onLogout() {
        this.authService.logout();
    }
}