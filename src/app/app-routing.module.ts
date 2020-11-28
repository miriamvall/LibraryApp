import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from "./shared/auth.guard";

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { BookCreateComponent } from './components/book-create/book-create.component';
import { BookEditComponent } from './components/book-edit/book-edit.component';
import { BookListComponent } from './components/book-list/book-list.component';


const routes: Routes = [
	{ path: '', redirectTo: '/log-in', pathMatch: 'full' },
	{ path: 'log-in', component: LoginComponent },
	{ path: 'register', component: RegisterComponent },
	{ path: 'user-profile/:id',
	children: [
		{ path: '', component: UserProfileComponent, canActivate: [AuthGuard]},
		{ path: 'create-book', component: BookCreateComponent, canActivate: [AuthGuard]},
		{ path: 'book-list', 
		children: [
			{ path: '', component: BookListComponent, canActivate: [AuthGuard]},
			{ path: 'edit-book/:bid', component: BookEditComponent, canActivate: [AuthGuard] }
		]}
	] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
