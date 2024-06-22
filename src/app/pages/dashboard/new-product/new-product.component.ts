import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-product',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.css'
})
export class NewProductComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder,private router: Router) {
    this.form = this.fb.group({
      username: new FormControl("", [Validators.required]),
  });
}

onSubmit() {
}

  close() {
    this.router.navigate(['products']);
  }
}
