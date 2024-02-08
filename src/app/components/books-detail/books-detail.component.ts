import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/model/dtos/book';
import { bookService } from 'src/services/book.service';

@Component({
  selector: 'app-books-detail',
  templateUrl: './books-detail.component.html',
  styleUrls: ['./books-detail.component.css']
})
export class BooksDetailComponent implements OnInit{
  bookId!: number;
  bookDetails!: Book;


constructor(private bookService: bookService, private router: Router, private activatedRoute: ActivatedRoute) {}
  ngOnInit(): void {
    this.bookId = this.activatedRoute.snapshot.params['bookId'];
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
  
}
