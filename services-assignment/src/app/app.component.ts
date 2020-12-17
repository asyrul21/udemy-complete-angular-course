import { Component, OnInit } from '@angular/core';
import { UsersService } from './UsersService.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UsersService]
})
export class AppComponent {
  activeUsers: string[] = [];
  inactiveUsers: string[] = [];

  constructor(private UsersServ: UsersService) {

  }

  // ngOnInit() {
  //   this.activeUsers = this.UsersServ.activeUsers;
  //   this.inactiveUsers = this.UsersServ.inactiveUsers;
  // }

  // onSetToInactive(id: number) {
  //   // this.inactiveUsers.push(this.activeUsers[id]);
  //   // this.activeUsers.splice(id, 1);

  //   this.UsersServ.setToActive(id)
  // }

  // onSetToActive(id: number) {
  //   // this.activeUsers.push(this.inactiveUsers[id]);
  //   // this.inactiveUsers.splice(id, 1);

  //   this.UsersServ.setToInactive(id);
  // }
}
