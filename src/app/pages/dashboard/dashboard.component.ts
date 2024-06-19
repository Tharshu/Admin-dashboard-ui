import { Component, OnInit, inject, signal } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { User } from '../../core/model/common.model';
import { error } from 'console';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
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

  toggleBlock(user: User): void {
    user.block = !user.block;
    // Optionally, make a service call to update the backend
    this.authService.updateUserBlockStatus(user.userId, user.block).subscribe({
      next: () => {
        console.log('User block status updated successfully');
      },
      error: (error) => {
        console.error('Error updating user block status:', error);
        user.block = !user.block; // revert change on error
      }
    });
  }

  logout(){
    this.authService.logout();
  }
}
