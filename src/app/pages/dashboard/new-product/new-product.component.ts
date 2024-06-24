import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-product',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,FormsModule],
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.css'
})
export class NewProductComponent {
  form: FormGroup;
  tagInput: string = '';
  tags: string[] = [];

  constructor(private fb: FormBuilder,private router: Router) {
    this.form = this.fb.group({
      username: new FormControl("", [Validators.required]),
      tagInput: new FormControl("")
  });
}
addTags() {
  const tagInputControl = this.form.get('tagInput');
  if (tagInputControl && tagInputControl.value) {
    const newTags = tagInputControl.value.split(',').map((tag: string) => tag.trim()).filter((tag: any) => tag);
    this.tags.push(...newTags);
    tagInputControl.reset();
  }
}

removeTag(tag: string) {
  this.tags = this.tags.filter(t => t !== tag);
}
onSubmit() {
}

  close() {
    this.router.navigate(['products']);
  }
}
