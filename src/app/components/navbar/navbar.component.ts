import { Component } from '@angular/core';
import { AuthService } from 'src/services/authservice.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private authService: AuthService) {}

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn(); // Metodo per verificare lo stato di autenticazione
  }
}
