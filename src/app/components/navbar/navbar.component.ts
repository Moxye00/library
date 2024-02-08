import { Component, OnDestroy } from '@angular/core';
import { AuthService } from 'src/services/authservice.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: 'navbar.component.html',
})
export class NavbarComponent {
  isLoggedIn: boolean = false;
  private userSubscription: Subscription | undefined;

  constructor(private authService: AuthService) {
    this.checkLogin();
    console.log(this.isLoggedIn);
  }

  checkLogin(){
    if(this.authService.checkLogin()) {
      this.isLoggedIn = true;
      return true;
    }
    this.isLoggedIn = false;
    return false;
  }

}