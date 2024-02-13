import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/model/dtos/book';
import { Genre } from 'src/model/dtos/genre';
import { AuthService } from 'src/services/authservice.service';
import { bookService } from 'src/services/book.service';
import { userService } from 'src/services/user.service';

@Component({
  selector: 'app-books-detail',
  templateUrl: './books-detail.component.html',
  styleUrls: ['./books-detail.component.css']
})
export class BooksDetailComponent implements OnInit{
  bookId!: number;
  bookDetails!: Book;
  showSuccessMessage: boolean = false;
  showErrorMessage: boolean = false;
  books: Book[] = [];

constructor(private bookService: bookService, private router: Router, private activatedRoute: ActivatedRoute, 
            private authService: AuthService, private userService: userService) {}
  ngOnInit(): void {
    this.bookId = this.activatedRoute.snapshot.params['booksId'];
    console.log(this.bookId);
    this.loadBookDetails();
  }
 
  loadBookDetails(){
    this.bookService.getBookDetail(this.bookId).subscribe({
      next: b => {
        this.bookDetails = b;
        console.log(this.bookDetails);
      },
      error: err => {
        console.error(err);
      }
    })
  }

  assignBookToUser(bookId: number): void {
    const userId = this.authService.checkLogin()?.user.id;
    if(userId){
      this.userService.assignBookToUser(userId, bookId).subscribe( {
        next: () => {
          console.log('Book added to library successfully');
          this.showSuccessMessage = true;
          setTimeout(() => {
            this.showSuccessMessage = false;
          }, 5000);
        }, 
        error: (error) => {
          console.error('Book not added to library', error);
          this.showErrorMessage = true;
          setTimeout(() => {
            this.showErrorMessage = false;
          }, 5000);;
        }
      });
    } else {
      console.error('Unauthenticated user.');
      alert('Please log in to add books to your list.');
    }
  } 

}
