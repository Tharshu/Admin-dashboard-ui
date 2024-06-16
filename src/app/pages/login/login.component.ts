import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { response } from 'express';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  form: FormGroup;
  authService = inject(AuthService);
  router = inject(Router);

  constructor(private fb: FormBuilder){
    this.form = this.fb.group({
      username: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    })
  }

  onSubmit() {
    if(this.form.valid){
      // console.log(this.form.value);
      this.authService.login(this.form.value).subscribe({
        next:(response)=>{
          this.router.navigate([''])
          // console.log(response);
        }
      })
    }
  }

}
