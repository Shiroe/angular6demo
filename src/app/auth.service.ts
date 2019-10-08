import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggedIn: boolean = false;

  constructor() { }

  login(user: string, password: string) {
    if (user === 'admin@example.com' && password === 'admin') {
      this.setLoggedIn(true);

      return Promise.resolve({ success: true, message: 'User has logged in successfully!' });
    }

    this.setLoggedIn(false);
    return Promise.reject({ success: false, message: 'Failed to login! Username and/or password were incorrect.' });
  }

  logout() {
    this.setLoggedIn(false);
    return Promise.resolve({ success: true, message: 'Logout success!' });
  }

  setLoggedIn(value: boolean) {
    this.isLoggedIn = value;
  }

  get isUserLoggedIn() {
    return this.isLoggedIn;
  }
}
