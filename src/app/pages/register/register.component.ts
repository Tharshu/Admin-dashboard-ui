import { Component, OnInit, inject } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { AuthService } from "../../core/services/auth.service";
import { Router } from "@angular/router";
import { response } from "express";
import { MetaService } from "../../core/services/meta.service";
import { CommonModule } from "@angular/common";
import { RegisterPayload } from "../../core/model/register-payload.model";
import { Role } from "../../core/model/role.model";

@Component({
  selector: "app-register",
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: "./register.component.html",
  styleUrl: "./register.component.css",
})
export class RegisterComponent implements OnInit{
  form: FormGroup;
  authService = inject(AuthService);
  router = inject(Router);
  roles: Role[] = [];

  constructor(private fb: FormBuilder, private metaService: MetaService) {
    this.form = this.fb.group({
      email: new FormControl("", [Validators.required, Validators.email]),
      username: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
      role: new FormControl("", [Validators.required]),
    });
  }
  ngOnInit(): void {
    this.metaService.getAllRoles().subscribe({
      next: (response) => {
        this.roles = response.data; // Assuming response.data holds the roles array
      },
      error: (error) => {
        console.error('Error fetching roles:', error);
      }
    });
  }


  onSubmit() {
    if (this.form.valid) {
      const formValue = this.form.value;
      // const selectedRole = this.roles.find(role => role.id === formValue.role);
      const selectedRole = this.roles.find(role => role.id === parseInt(formValue.role));
      console.log(selectedRole);
      if (selectedRole) {
        const payload: RegisterPayload = {
          email: formValue.email,
          userName: formValue.username,
          password: formValue.password,
          role: selectedRole
        };

        this.authService.register(payload).subscribe({
          next: (response) => {
            this.router.navigate(["login"]);
          },
          error: (error) => {
            console.error('Registration error:', error);
          }
        });
      } else {
        console.error('Selected role is not valid.');
      }
    }
  }

  // onSubmit() {
  //   if (this.form.valid) {
  //     this.authService.register(this.form.value).subscribe({
  //       next: (response) => {
  //         this.router.navigate(["login"]);
  //       },
  //     });
  //     console.log(this.form.value);
  //   }
  // }
}
