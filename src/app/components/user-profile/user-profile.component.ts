import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})

export class UserProfileComponent implements OnInit {
  currentUser: any = {};
  id: string;

  constructor(
    public authService: AuthService,
    private actRoute: ActivatedRoute
  ) {
    this.id = this.actRoute.snapshot.paramMap.get('id');
    this.authService.getUserProfile(this.id).subscribe(res => {
      this.currentUser = res.msg;
    })
  }

  ngOnInit() { }
}