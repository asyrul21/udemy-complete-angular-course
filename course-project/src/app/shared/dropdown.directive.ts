import { Directive, HostListener, Input, HostBinding } from '@angular/core';

@Directive({
    selector: '[appDropdown]'
})

export class DropdownDirective {
    @HostBinding('class.open') isOpen: Boolean = false;

    @HostListener('click') toggleOpen(eventData: Event) {
        this.isOpen = !this.isOpen;
    }
}