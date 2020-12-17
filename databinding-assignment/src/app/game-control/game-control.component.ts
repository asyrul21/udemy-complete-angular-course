import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css']
})
export class GameControlComponent implements OnInit {
  interval;
  @Output() gameStarted = new EventEmitter<number>();
  number = 0;
  // end = false;

  constructor() { }

  ngOnInit(): void {
  }

  onClickStart() {
    // console.log('Start Button clicked!');
    this.interval = setInterval(() => {
      this.number += 1;
      this.gameStarted.emit(this.number)
    }, 1000);
  }

  onClickEnd() {
    // this.end = true;

    // to pause
    clearInterval(this.interval);
  }
}
