import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { UsersService } from '../UsersService.service';

@Component({
  selector: 'app-inactive-users',
  templateUrl: './inactive-users.component.html',
  styleUrls: ['./inactive-users.component.css']
})
export class InactiveUsersComponent implements OnInit {
  users: string[];
  // @Input() users: string[];
  // @Output() userSetToActive = new EventEmitter<number>();

  constructor(private UserServ: UsersService) {

  }

  ngOnInit() {
    this.users = this.UserServ.inactiveUsers;
  }

  onSetToActive(id: number) {
    // this.userSetToActive.emit(id);
    this.UserServ.setToActive(id);
  }
}
