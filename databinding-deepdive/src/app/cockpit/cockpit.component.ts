import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent implements OnInit {

  // register new event emitter
  // https://stackoverflow.com/questions/50494949/angular-eventemitter-error-expected-0-type-arguments-but-got-1

  // assign aliases with @
  @Output() serverCreated = new EventEmitter<{ serverName: string, serverContent: string }>();
  @Output('bpCreated') blueprintCreated = new EventEmitter<{ serverName: string, serverContent: string }>();

  // newServerName = '';
  // newServerContent = '';

  // ViewChild //of type ElementRef
  // pass name of local reference
  @ViewChild('serverContentInput') serverContentInput: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  onAddServer(nameInput: HTMLInputElement) {
    // this.serverCreated.emit({ serverName: nameInput.value, serverContent: this.newServerContent });
    this.serverCreated.emit({ serverName: nameInput.value, serverContent: this.serverContentInput.nativeElement.value });
  }

  onAddBlueprint(nameInput: HTMLInputElement) {
    // this.blueprintCreated.emit({ serverName: nameInput.value, serverContent: this.newServerContent });
    this.blueprintCreated.emit({ serverName: nameInput.value, serverContent: this.serverContentInput.nativeElement.value });
  }

}
