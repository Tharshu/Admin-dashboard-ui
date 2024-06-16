import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { response } from 'express';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  form: FormGroup;
  authService = inject(AuthService);
  router = inject(Router);

  constructor(private fb: FormBuilder){
    this.form = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      role: new FormControl('', [Validators.required])
    })
  }

  onSubmit() {
    if(this.form.valid){
      this.authService.register(this.form.value).subscribe({
        
        next:(response)=>{
          this.router.navigate(['login'])
        }
      })
      console.log(this.form.value);
    }
  }
}
