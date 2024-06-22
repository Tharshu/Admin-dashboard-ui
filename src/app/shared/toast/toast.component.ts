import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import bootstrap from '../../../main.server';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css'
})
export class ToastComponent implements AfterViewInit{

  message: string = '';
  isSuccess: boolean = true;

  constructor(private cdr: ChangeDetectorRef, private toastService: NotificationService) {}

  ngAfterViewInit() {
    this.toastService.register(this);
  }

  showSuccessToast(message: string) {
    console.log("success", message);
    this.message = message;
    this.isSuccess = true;
    this.showToast();
  }

  showErrorToast(message: string) {
    console.log("error", message);
    this.message = message;
    this.isSuccess = false;
    this.showToast();
  }

  showToast() {
    const toastEl = document.getElementById('toast');
    if (toastEl) {
      const toast = new (window as any).bootstrap.Toast(toastEl);
      this.cdr.detectChanges(); // Ensure change detection runs
      toast.show();
    }
  }
}
