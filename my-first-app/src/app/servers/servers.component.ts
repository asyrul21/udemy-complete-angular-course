import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  allowNewServer = false;
  serverCreationStatus = 'No server was created!';
  serverName = 'Testserver';
  username = "";
  serverCreated = false;
  servers = ['Testserver', 'Testserver 2'];
  passwordShown = false;
  timestamps = [];
  numbers = []
  number = 0;

  constructor() {
    setTimeout(() => {
      this.allowNewServer = true;
    }, 2000)
  }

  onCreateServer() {
    this.serverCreated = true;
    this.servers.push(this.serverName);
    this.serverCreationStatus = 'Server was created! Name is ' + this.serverName;
  }

  onUpdateServerName(event: any) {
    // console.log(event)
    // this.serverName = (<HTMLInputElement>event.target).value;
    this.serverName = event.target.value;
    // console.log(this.serverName)
  }

  onClick(event: any) {
    // console.log(event.timeStamp)
    this.timestamps.push(event.timeStamp);
    // console.log(this.timestamps)
    this.numbers.push(this.number++);

    return this.passwordShown = !this.passwordShown;
  }

  getColor(num) {
    return num >= 5 ? 'blue' : 'white';
  }

  onResetUsername(): void {
    this.username = '';
  }

  checkEmptyUsername(): boolean {
    return this.username === '';
  }

  ngOnInit(): void {
  }

}
