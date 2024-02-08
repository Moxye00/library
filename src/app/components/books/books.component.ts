import { Component, OnInit } from '@angular/core';
import { Book } from 'src/model/dtos/book';
import { AuthService } from 'src/services/authservice.service';
import { bookService } from 'src/services/book.service';
import { userService } from 'src/services/user.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit{
  allBooks: Book[] = [];

  constructor(private bookService: bookService, private authService: AuthService, private userService: userService){}

  ngOnInit(): void {
    this.fetchAllBooks();
  }

  fetchAllBooks() {
    this.bookService.getAllBooks().subscribe({
      next: b => {
          this.allBooks = b;
          console.log(this.allBooks);
      },
      error: (error) => {
          console.error('Errore nel recupero dei libri:', error);
      }
    });
  }

  assignBookToUser(bookId: number): void {
    debugger;
    const userId = this.authService.checkLogin()?.user.id;
    if(userId){
      this.userService.assignBookToUser(userId, bookId).subscribe(
        () => {
          console.log('Book added to library successfully');
        },
        error => {
          console.error('Error adding book to library:', error);
        }
      );
    } else {
      console.error('user non è loggato');
    }
  }


    
}
