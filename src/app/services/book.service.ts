import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Book } from '../models/book'
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookService {

	baseUri: string = 'http://localhost:8080/api';
	headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  // Create
  createBook(userId, book: Book): Observable<any> {
    let url = `${this.baseUri}/user/${userId}/books`;
    return this.http.post<any>(url, book).pipe(
      catchError(this.errorMgmt)
      )
  }

  // get books of a user
  getBooks(userId) {
    let url = `${this.baseUri}/user/${userId}/books`;
    return this.http.get(url, {headers: this.headers}).pipe(
      map((res: Response) => {
      return res || {}
      }),
      catchError(this.errorMgmt)
      )
  }

  // edit book
  editBook(userId, bookId, data): Observable<any> {
    let url = `${this.baseUri}/user/${userId}/books/${bookId}`;
    return this.http.patch(url,data)
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  // delete book
  deleteBook(userId, bookId) {
    let url = `${this.baseUri}/user/${userId}/books/${bookId}`;
    return this.http.delete(url)
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  // Error handling 
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }


}
