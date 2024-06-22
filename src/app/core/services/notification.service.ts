import { Injectable } from '@angular/core';
import { ToastComponent } from '../../shared/toast/toast.component';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }

  private toastComponent: ToastComponent | null = null;

  register(toastComponent: ToastComponent) {
    this.toastComponent = toastComponent;
  }

  showSuccess(message: string) {
    this.toastComponent?.showSuccessToast(message);
  }

  showError(message: string) {
    this.toastComponent?.showErrorToast(message);
  }
}
