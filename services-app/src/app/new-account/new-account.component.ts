import { Component } from '@angular/core';
import { LoggingService } from '../logging.service'
import { AccountsService } from '../accounts.service';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css'],
  // providers: [LoggingService]
})
// register services in providers
// remove service from providers to implement hierarchical injection
// using the same service instance as the parent

export class NewAccountComponent {
  // @Output() accountAdded = new EventEmitter<{ name: string, status: string }>();

  // injecting accounts service
  constructor(private loggingService: LoggingService,
    private accService: AccountsService) {
    // listen to emitted events
    this.accService.statusUpdated.subscribe((status: string) => {
      alert('New Status: ' + status)
    });
  }

  onCreateAccount(accountName: string, accountStatus: string) {
    // this.accountAdded.emit({
    //   name: accountName,
    //   status: accountStatus
    // });

    this.accService.addAccount(accountName, accountStatus)
    // this.loggingService.logStatusChange(accountStatus);
  }
}
