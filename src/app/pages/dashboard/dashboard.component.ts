import { Component, OnInit, inject, signal } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { User } from '../../core/model/common.model';
import { error } from 'console';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  authService = inject(AuthService);
  users: User[] = [];
  isLoggedIn = signal<boolean>(false);


  ngOnInit(): void {

    this.isLoggedIn.update(()=> this.authService.isLoggedIn());

    this.authService.getallusers().subscribe({
      next: (response)=> {
        this.users = response.data;
      },
      error: (error)=>{
        console.error('Error fetching users:', error);
      }
    })
  }


  logout(){
    this.authService.logout();
  }
}
