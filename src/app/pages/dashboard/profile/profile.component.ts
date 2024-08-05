import { Component, inject, OnInit } from '@angular/core';
import { BackButtonComponent } from "../../../shared/back-button/back-button.component";
import { EmailValidator } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../core/model/user.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [BackButtonComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  userEmail: any
  userService = inject(AuthService);
  user: User | any;


  ngOnInit(): void {
    this.userEmail = localStorage.getItem('email');
    this.getUserByEmail(this.userEmail);
  }


  getUserByEmail(email: string){
    this.userService.getUserByEmail(email).subscribe({
      next: (data) => {
        this.user = data.data;
      },
      error: (error) => {
        console.error("error getting user.");
      },
    })
  }


}
