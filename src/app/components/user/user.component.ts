import { Component, OnInit } from '@angular/core';
import { AuthUser } from 'src/model/dtos/auth-user';
import { AuthService } from 'src/services/authservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{
  /*userData: any;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getUserData().subscribe(
      (userData) => {
        this.userData = userData;
      },
      (error) => {
        console.error('errore nel recupero dei dati', error);
      } 
    );
  }*/

  userData: AuthUser | null = null;

  constructor(private authService: AuthService, private router: Router ) {}

  ngOnInit(): void {
    this.userData = this.authService.checkLogin();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login'])
  }

}
