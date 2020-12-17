import { Injectable, EventEmitter } from '@angular/core';

// using subject - better than event emitter
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
    // activateEmitter = new EventEmitter<boolean>();

    // Using subject
    activateEmitter = new Subject<boolean>();
}