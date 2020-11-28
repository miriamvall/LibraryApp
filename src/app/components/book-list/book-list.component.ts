import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

	user_id: string;
	books: any = []; 

  constructor(private router: Router,
  	private actRoute: ActivatedRoute,
  	private bookService: BookService
  	) {
  		this.actRoute.parent.params.subscribe(params => {
      	this.user_id = params['id']
    	})
    	this.readBooks();
  	}

  ngOnInit(){
  	
  }

  readBooks(){
  	this.bookService.getBooks(this.user_id).subscribe((data) => {
  		this.books = data;
  	})
  }

  removeBook(book, index) {
  	if(window.confirm('are you sure you want to delete?')) {
  		this.bookService.deleteBook(this.user_id, book._id).subscribe((data) => {
  			this.books.splice(index,1);
  		})
  	}
  }




}
