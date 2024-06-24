import { CommonModule } from "@angular/common";
import { Component, OnInit, inject } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { ProductService } from "../../../core/services/product.service";
import { ProductCollection, ProductType } from "../../../core/model/common.model";

@Component({
  selector: "app-new-product",
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: "./new-product.component.html",
  styleUrl: "./new-product.component.css",
})
export class NewProductComponent implements OnInit{
  form: FormGroup;
  tagInput: string = "";
  tags: string[] = [];
  productService = inject(ProductService);
  types: ProductType[] = [];
  collections: ProductCollection[] = [];
  currentPage = 0;
  pageSize = 100;
  totalItems = 0;
  constructor(private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group({
      username: new FormControl("", [Validators.required]),
      tagInput: new FormControl(""),
    });
  }
  ngOnInit(): void {
    this.getProductType();
    this.getCollectionData();
  }
  addTags() {
    const tagInputControl = this.form.get("tagInput");
    if (tagInputControl && tagInputControl.value) {
      const newTags = tagInputControl.value
        .split(",")
        .map((tag: string) => tag.trim())
        .filter((tag: any) => tag);
      this.tags.push(...newTags);
      tagInputControl.reset();
    }
  }

  removeTag(tag: string) {
    this.tags = this.tags.filter((t) => t !== tag);
  }
  onSubmit() {}

  close() {
    this.router.navigate(["products"]);
  }

  getProductType() {
    this.productService.getAllType().subscribe({
      next: (data) => {
        this.types = data.data;
        console.log("Table data refreshed:", this.types);
      },
      error: (error) => {
        console.error("Error fetching product type", error);
      },
    });
  }

  getCollectionData() {
    this.productService
      .getAllCollection(this.currentPage, this.pageSize)
      .subscribe({
        next: (data) => {
          this.collections = data.data; // Adjust this based on your actual response structure
          // this.totalItems = data.totalItems; // Adjust this based on your actual response structure
          console.log("Table data refreshed:", this.collections);
        },
        error: (error) => {
          console.error("Error fetching collections", error);
        },
      });
  }
}
