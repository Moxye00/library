import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { BooksComponent } from './components/books/books.component';
import { LoginComponent } from './components/login/login.component';
import { UserComponent } from './components/user/user.component';
import { BooksDetailComponent } from './components/books-detail/books-detail.component';
import { AuthGuard } from './auth.guard';
const routes: Routes = [
  { path: '', component:HomeComponent},
  { path: 'books', component:BooksComponent},
  { path: 'login', component:LoginComponent, canActivate:[AuthGuard]},
  { path: 'user', component:UserComponent},
  { path: 'books/:booksId', component:BooksDetailComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }