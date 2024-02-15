import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/model/dtos/book';
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
    this.activatedRoute.paramMap.subscribe(
      pm => {
        let idString = pm.get('bookId')!;
        this.bookId = +idString;
        console.log(this.bookId);
        this.loadBookDetails();
      }
    );
  }
 
  loadRandomBooks(){
      const genreId = this.bookDetails.genre.id;
      const limit = 4;
      this.bookService.getRandomBooksByGenre(genreId, limit).subscribe({
        next: books => {
          this.books = books.filter(b => b.id != this.bookDetails.id);
        },
        error: err => {
          console.error('errore durante il recupero di libri random', err);
        }
      }); 
  }

  loadBookDetails(){
    this.bookService.getBookDetail(this.bookId).subscribe({
      next: b => {
        this.bookDetails = b;
        this.loadRandomBooks();
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
