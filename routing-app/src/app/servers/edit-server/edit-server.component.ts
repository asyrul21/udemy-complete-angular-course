import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CanComponentDeactivate } from './can-deactivate-guard.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, CanComponentDeactivate {
  server: { id: number, name: string, status: string };
  serverName = '';
  serverStatus = '';
  allowEdit = false;
  changesSaved = false;

  constructor(private serversService: ServersService, private currentRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    // console.log(this.currentRoute.snapshot.queryParams);

    // subscribe
    this.currentRoute.queryParams.subscribe((queryParams: Params) => {
      this.allowEdit = queryParams['allowEdit'] === '1' ? true : false;
    });
    this.currentRoute.fragment.subscribe();

    // to get ID use .snapshot.params
    const id = +this.currentRoute.snapshot.params['id'];
    this.server = this.serversService.getServer(id);
    // subscribe route params to update the id if params changed
    this.currentRoute.params.subscribe((params: Params) => {
      this.server = this.serversService.getServer(+params['id'])
    })
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, { name: this.serverName, status: this.serverStatus });
    this.changesSaved = true;
    this.router.navigate(['../'], { relativeTo: this.currentRoute })
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.allowEdit) {
      return true;
    }
    // serverName is input server name
    if ((this.serverName !== this.server.name || this.serverStatus !== this.server.status) && (!this.changesSaved)) {
      return confirm('Do you want to discard the changes?');
    } else {
      return true;
    }
  }
}
