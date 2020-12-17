import { Component, OnInit, Input, ViewEncapsulation, SimpleChanges, ContentChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css'],
  encapsulation: ViewEncapsulation.Emulated //default
})
export class ServerElementComponent implements OnInit {
  // definition of custom element
  // give property name with @ within Input
  @Input('srvElement') element: { type: string, name: string, content: string };
  @Input() name: string;

  // get access to content in parent component
  @ContentChild('contentParagraph') paragraph: ElementRef;

  constructor() {
    console.log('Constructor called!');

  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('ngOnChanges called!');
    console.log(changes);

  }

  ngOnInit(): void {
    console.log('ngOnInit called!');
    console.log('Text content of paragraph: ' + this.paragraph.nativeElement.textContent);
  }

  ngAfterContentInit() {
    console.log('Text content of paragraph: ' + this.paragraph.nativeElement.textContent);
  }

}
