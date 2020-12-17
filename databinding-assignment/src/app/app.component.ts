import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  numbers: number[] = []

  onGameStart(data: number) {
    this.numbers.push(data);
    console.log(data);
  }
}
