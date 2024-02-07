import { Component, OnDestroy } from '@angular/core';
import { AuthService } from 'src/services/authservice.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: 'navbar.component.html',
})
export class NavbarComponent implements OnDestroy {
  isLoggedIn: boolean = false;
  private userSubscription: Subscription | undefined;

  constructor(private authService: AuthService) {
    this.userSubscription = this.authService.userPublisher.subscribe((user) => {
      this.isLoggedIn = !!user;
    });
  }

  ngOnDestroy() {
    this.userSubscription?.unsubscribe();
  }
}