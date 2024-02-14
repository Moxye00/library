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
  showSuccessMessage: boolean = false;
  showErrorMessage: boolean = false;
  hideBookList: boolean=false;
  currentPage: number=1;
  pageSize: number=12;
  pagedBooks: Book[] = [];

  constructor(private bookService: bookService, private authService: AuthService, private userService: userService){}

  ngOnInit(): void {
    this.fetchAllBooks();
  }

  fetchAllBooks() {
    this.bookService.getAllBooks().subscribe({
      next: b => {
          this.pagedBooks = b;
          console.log(this.allBooks);
          this.setPage(1);
      },
      error: (error) => {
          console.error('Errore nel recupero dei libri:', error);
      }
    });
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
          }, 5000);
        }
      });
    } else {
      console.error('Unauthenticated user.');
      alert('Please log in to add books to your list.');
    }
  }

  pageChanged(page:number): void {
    this.setPage(page);
    console.log(this.currentPage);
  }

  setPage(page:number): void {
    const startIndex = (page - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedBooks = this.allBooks.slice(startIndex, endIndex);
    this.currentPage = page;
  }

}
