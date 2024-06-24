import { Component, OnInit, ViewChild, inject, signal } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { User } from '../../core/model/common.model';
import { error } from 'console';
import { CommonModule } from '@angular/common';
import { SidePanelComponent } from '../../shared/side-panel/side-panel.component';
import { ToastComponent } from "../../shared/toast/toast.component";

@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css',
    imports: [CommonModule, ToastComponent]
})
export class DashboardComponent implements OnInit{
  @ViewChild(ToastComponent) toastComponent!: ToastComponent;
  authService = inject(AuthService);
  users: User[] = [];
  isLoggedIn = signal<boolean>(false);
  loading: boolean = true;

  ngOnInit(): void {
    this.loadData();

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


  loadData() {
    this.loading = true;
    this.authService.getallusers().subscribe(
      data => {
        this.users = data.data;
        this.loading = false;
      },
      error => {
        console.error(error);
        this.loading = false;
      }
    );
  }

  toggleBlock(user: User): void {
    user.isBlocked = !user.isBlocked;
    // Optionally, make a service call to update the backend
    this.authService.updateUserBlockStatus(user.userId, user.isBlocked).subscribe({
      next: () => {
        this.toastComponent.showSuccessToast(user.isBlocked ? 'User blocked' : 'User unblocked');
        // console.log('User block status updated successfully');
      },
      error: (error) => {
        console.error('Error updating user block status:', error);
        user.isBlocked = !user.isBlocked; // revert change on error
        this.toastComponent.showErrorToast('Failed to update user block status');
      }
    });
  }

  logout(){
    this.authService.logout();
  }
}
