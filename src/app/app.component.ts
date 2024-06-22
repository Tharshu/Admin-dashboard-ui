import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ToastComponent } from "./shared/toast/toast.component";
import { NotificationService } from './core/services/notification.service';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    imports: [CommonModule, RouterOutlet, ToastComponent]
})
export class AppComponent {
  title = 'auth-project';

  constructor(private toastService: NotificationService) {}

  triggerSuccess() {
    this.toastService.showSuccess('This is a success message');
  }

  triggerError() {
    this.toastService.showError('This is an error message');
  }
}
