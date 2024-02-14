import { Component, EventEmitter, Input, Output } from '@angular/core';
import { every } from 'rxjs';
import { Book } from 'src/model/dtos/book';


@Component({
  selector: 'app-books-card',
  templateUrl: './books-card.component.html',
  styleUrls: ['./books-card.component.css']
})
export class BooksCardComponent{
  @Input() bookDetails: Book | undefined;

  @Output() selected = new EventEmitter<number>;

  bookSelected(){
    this.selected.emit(this.bookDetails?.id);
  }
}
