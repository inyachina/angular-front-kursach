import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  showFiller = false;

  constructor(private _router: Router) {
  }

  ngOnInit(): void {
  }
  public logout() {
    this._router.navigateByUrl('login');
  }

  public goToProduct() {
    this._router.navigateByUrl('main/store');
  }

  public goToEvent() {
    this._router.navigateByUrl('main/events');
  }

  public goToPeople() {
    this._router.navigateByUrl('main/people');
  }
}
