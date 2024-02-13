import { Component, OnInit } from '@angular/core';
import { AuthUser } from 'src/model/dtos/auth-user';
import { AuthService } from 'src/services/authservice.service';
import { Router } from '@angular/router';
import { LibraryItemDto } from 'src/model/dtos/library-item';
import { userService } from 'src/services/user.service';
import { User } from 'src/model/dtos/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{

  userData: AuthUser | null = null;
  user!: User;
  userBooks: LibraryItemDto[] = [];
  showAlreadyAddedMessage: boolean = false;

  constructor(private authService: AuthService, private userService: userService, private router: Router ) {}

  ngOnInit(): void {
    this.userData = this.authService.checkLogin();
    this.fetchAssignedBook(this.userData?.user.id);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login'])
  }

  fetchAssignedBook(userId: number | undefined): void {
    this.userService.getUserBooks(userId).subscribe({
        next: (library) => {
          this.userBooks = library;
          console.log(library);
        },
        error: (error) => {
            console.error('Error fetching books', error);
        }
    });
  }

  deleteAssignedBook(id: number){
    this.userService.deleteBookAssignment(id).subscribe({
      next: () => {
        this.fetchAssignedBook(this.userData?.user.id);
      },
      error: (error) => {
        console.error('impossibile assolutamente cancellare libro', error);
      }
    });
  }

  viewBookDetails(bookId: number) {
    this.router.navigate(['/books', bookId]);
  }

  assignBookToUser(bookId: number): void {
    if (this.userBooks.some(item => item.bookId === bookId)) {
      this.showAlreadyAddedMessage = true;
      console.error('The book is already on your list.');
    } else {
      const userId = this.userData?.user.id;
      if (userId) {
        this.userService.assignBookToUser(userId, bookId).subscribe({
          next: () => {
            console.log('Book successfully added to your list!');
            this.fetchAssignedBook(userId);
          },
          error: (error) => {
            console.error('Error adding book to your list:', error);
          }
        });
      } else {
        console.error('Unauthenticated user.');
        alert('Please log in to add books to your list.');
      }
    }
  }

}
