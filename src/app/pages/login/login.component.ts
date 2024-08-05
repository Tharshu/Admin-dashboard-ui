import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { response } from 'express';
import { Router } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { ToastComponent } from '../../shared/toast/toast.component';

@Component({
    selector: 'app-login',
    standalone: true,
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
    imports: [ReactiveFormsModule, ToastComponent]
})
export class LoginComponent implements OnInit{
  @ViewChild(ToastComponent) toastComponent!: ToastComponent;
  form: FormGroup;
  authService = inject(AuthService);
  router = inject(Router);

  constructor(private fb: FormBuilder){
    this.form = this.fb.group({
      username: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      rememberMe: [false]
    })
  }
  ngOnInit(): void {
    if (this.isBrowser()) {
      const rememberMe = localStorage.getItem('rememberMe') === 'true';
      this.form.patchValue({ rememberMe });
    }
  }

  onSubmit() {
    if(this.form.valid){
      this.authService.login(this.form.value).subscribe({
        next:(response)=>{

          if (response.status) {
            this.toastComponent.showSuccessToast('Login successful!');
            localStorage.setItem("email", this.form.value.username);
            this.authService.isLoggedIn.update(() => true);
            this.router.navigate(['']); // Navigate to home page
          } else {
            this.toastComponent.showErrorToast('Login failed. Please try again.');
          }
        },
        error: (error) => {
          console.error('Login error:', error);
          this.toastComponent.showErrorToast('An error occurred. Please try again later.');
        }
      })
    }

    if (this.isBrowser()) {
      const rememberMe = this.form.get('rememberMe')?.value;
      localStorage.setItem('rememberMe', rememberMe);
    }
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

}
