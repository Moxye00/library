import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Author } from 'src/model/dtos/author';
import { authorService } from 'src/services/author.service';

@Component({
  selector: 'app-author',
  templateUrl: './author-details.component.html',
  styleUrls: ['./author-details.component.css']
})
export class AuthorDetailsComponent implements OnInit{
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  
  authorDetails!: Author;
  authorId!: number;

  constructor(private router: Router,
              private activeRoute: ActivatedRoute,
              private authorService: authorService){}
  
  
  loadAuthorDetails(){
    this.authorService.getAuthorsDetails(this.authorId).subscribe({
      next: a => {
        this.authorDetails= a;
        console.log(this.authorDetails);
      },
      error: err => {
        console.error(err);
      }
    })
  }
}
