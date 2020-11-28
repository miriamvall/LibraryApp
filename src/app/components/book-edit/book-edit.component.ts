import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Book } from '../../models/book';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit {

	editForm: FormGroup;
	bookData: Book;
	user_id: string;
	book_id: string;

  constructor(
  	public fb: FormBuilder,
  	private actRoute: ActivatedRoute,
  	private bookService: BookService,
  	private router: Router
  ) {
  	this.actRoute.parent.params.subscribe(params => {
     	this.user_id = params['id']
    })
    this.actRoute.params.subscribe(params => {
    	this.book_id = params['bid']
    })
    this.editForm = this.fb.group({
    	title: [''],
    	author: [''],
    	description: ['']
    })
   }

  ngOnInit() {}

  onSubmit(){
  	if(window.confirm('Are you sure you want to save?')) {
  		this.bookService.editBook(this.user_id, this.book_id, this.editForm.value)
  			.subscribe(res => {
  				this.router.navigateByUrl('user-profile/' + this.user_id + '/book-list');
  			}, (error) => {
  				console.log(error)
  			})
  	}
  }



}
