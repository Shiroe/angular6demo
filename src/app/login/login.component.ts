import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user: string = '';
  public password: string = '';

  constructor(
      public auth: AuthService,
      public router: Router
    ) {

  }

  ngOnInit() {
  }

  login(event: any) {
    event.preventDefault();

    // Below check is done in case we had persistent state of the user login
    if (this.auth.isUserLoggedIn) {
      this.router.navigate(['/']);
      return;
    }

    const [userField, passwordField] = event.target;
    const { value: user } = userField;
    const { value: password } = passwordField;
    
    this.auth.login(user, password).then(res => {
      if (res.success) {
        console.log(res.message);
        this.router.navigate(['/']);
      } else {
        window.alert(res.message);
      }
    })
    .catch(error => {
      window.alert(error.message);
    });
  }

}
