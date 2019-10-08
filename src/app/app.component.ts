import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title: string = `Antzelo's Demo`;
  public isLoggedIn: boolean = false;

  constructor(
      public auth: AuthService,
      public router: Router,
    ) {
  }

  ngDoCheck() {
    this.isLoggedIn = this.auth.isUserLoggedIn;
  }

  menuNavigation(nav: string) {
    this.closeNavBar();
    if (nav === 'logout') {
      return this.logout();
    }

    return this.router.navigate([nav]);
  }

  closeNavBar() {
    const nav = document.getElementById("navbarNav");
    nav.classList.remove('show');
  }

  isMenuActive(url: string) {
    return this.router.url === url;
  }

  logout() {
    console.log('logging out...');
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
