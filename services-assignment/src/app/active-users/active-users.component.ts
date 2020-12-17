import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { UsersService } from '../UsersService.service';

@Component({
  selector: 'app-active-users',
  templateUrl: './active-users.component.html',
  styleUrls: ['./active-users.component.css']
})
export class ActiveUsersComponent implements OnInit {
  users: string[];
  // @Input() users: string[];
  // @Output() userSetToInactive = new EventEmitter<number>();

  constructor(private UserServ: UsersService) {
  }

  ngOnInit() {
    this.users = this.UserServ.activeUsers;
  }

  onSetToInactive(id: number) {
    // this.userSetToInactive.emit(id);
    this.UserServ.setToInactive(id)
  }
}
