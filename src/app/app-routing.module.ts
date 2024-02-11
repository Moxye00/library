import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { BooksComponent } from './components/books/books.component';
import { LoginComponent } from './components/login/login.component';
import { UserComponent } from './components/user/user.component';
import { BooksDetailComponent } from './components/books-detail/books-detail.component';
const routes: Routes = [
  { path: '', component:HomeComponent},
  { path: 'books', component:BooksComponent},
  { path: 'login', component:LoginComponent},
  { path: 'user', component:UserComponent},
  { path: 'books/:booksId', component:BooksDetailComponent},
  { path: 'user/:booksId', component:BooksDetailComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }