import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(
    private _router: Router,
  ) {}

  public ngOnInit(): void {
    this._redirect();
    this._navigateToAuth();
  }


  private _redirect(): void {
    const redirect = '?redirect=';

    if (window.location.search.includes(redirect)) {
      const path = window.location.search.replace(redirect, '');

      if (path) {
        this._router.navigateByUrl(path);
      }
    }
  }

  private _navigateToAuth(): void {
    if (this._router.url.indexOf('/login/') === -1) {
      this._router.navigateByUrl('login');
    }
  }
}
