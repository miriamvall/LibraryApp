import { Component, OnInit, NgZone } from '@angular/core';
import { BookService } from '../../services/book.service';
import { AuthService } from '../../services/auth.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.css']
})
export class BookCreateComponent implements OnInit {

	bookForm: FormGroup;
  id: string;
  submitted = false;

  constructor(
  	public fb: FormBuilder,
  	private router: Router,
  	private actRoute: ActivatedRoute,
  	private bookService: BookService
  ) {
    this.actRoute.parent.params.subscribe(params => {
      this.id = params['id']
    })
  	this.mainForm();
   }

  ngOnInit() {
  }

  mainForm() {
  	this.bookForm = this.fb.group({
  		title: ['', [Validators.required]],
  		author: ['', [Validators.required]],
  		description: ['', [Validators.required]]
  	})
  }

  onSubmit(){
      this.submitted = true;
      if(!this.bookForm.valid){
        return false;
      } else {
        this.bookService.createBook(this.id, this.bookForm.value).subscribe((res) => {
        this.bookForm.reset();
        this.router.navigateByUrl('user-profile/' + this.id + '/book-list');
        }, (error) => {
        console.log(error);
        });
      }
  		
  	
  }

}
