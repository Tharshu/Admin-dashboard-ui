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
import { Product, ProductCollection, ProductType } from "../../../core/model/common.model";

@Component({
  selector: "app-new-product",
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: "./new-product.component.html",
  styleUrls: ["./new-product.component.css"],
})
export class NewProductComponent implements OnInit{
  form: FormGroup;
  tagInput: string = "";
  tags: string[] = [];
  productService = inject(ProductService);
  types: ProductType[] = [];
  collections: ProductCollection[] = [];
  products: Product[] = [];
  currentPage = 0;
  pageSize = 100;
  totalItems = 0;
  constructor(private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group({
      tagInput: new FormControl(""),
      id: new FormControl(""),
      title: new FormControl("", [Validators.required]),
      subtitle: new FormControl(""),
      description: new FormControl(""),
      handle: new FormControl(""),
      isGiftcard: new FormControl(false),
      status: new FormControl(""),
      thumbnail: new FormControl(""),
      collection: new FormControl(""),
      type: new FormControl(""),
      discountable: new FormControl(false),
      externalId: new FormControl(""),
      profileId: new FormControl(""),
      weight: new FormControl(""), 
      length: new FormControl(""),  
      height: new FormControl(""),
      width: new FormControl(""),
      hsCode: new FormControl(""),
      originCountry: new FormControl(""),
      midCode: new FormControl(""),
      material: new FormControl(""),
      salesChannels: new FormControl(false)
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
  
  onSubmit() {
    if(this.form.valid){
      const formValue = this.form.value;
      console.log("publish ",formValue);

      const selectedCollection = this.collections.find(collection => collection.id ===formValue.collection);
      const selectedType = this.types.find(type => type.id === formValue.type);

      console.log("collection",selectedCollection);
      console.log("type", selectedType);
      const payload: Product = {
        ...formValue,
        title: formValue.title,
        subtitle: formValue.subtitle,
        description: formValue.description,
        handle: formValue.handle,
        isGiftcard: false,
        status: 'draft',
        id: "",
        thumbnail: "",
        collectionId: selectedCollection ? { id: selectedCollection.id } : null,
        typeId: selectedType ? { id: selectedType.id } : null,
        discountable: formValue.discountable,
        externalId: "",
        profileId: "",
        weight: 0,
        length: 0,
        height: 0,
        width: 0,
        hsCode: "",
        originCountry: "",
        midCode: "",
        material: formValue.material,
        createdAt: "",
        updatedAt: "",
        deletedAt: ""
      }
      this.productService.createProduct(payload).subscribe({
        next: (response) => {
          console.log('Product created successfully', response);
          this.close();
        },
        error: (error) => {
          console.error('Error creating product', error);
        }
      });
    }
  }

  publishProduct() {
    if (this.form.valid) {
      const formValue = this.form.value;

      const selectedCollection = this.collections.find(collection => collection.id ===formValue.collection);
      const selectedType = this.types.find(type => type.id === formValue.type);
   
      console.log("publish", formValue);
      console.log("collection",selectedCollection);
      console.log("type", selectedType);
      const payload: Product = {
        ...formValue,
        id: "",
        status: 'published',
        collectionId: selectedCollection ? { id: selectedCollection.id } : null,
        typeId: selectedType ? { id: selectedType.id } : null,
        discountable: formValue.discountable,
        isGiftcard: false,
        createdAt: "",
        updatedAt: "",
        deletedAt: ""
      };

      this.productService.createProduct(payload).subscribe({
        next: (response) => {
          console.log('Product published successfully', response);
          this.close();
        },
        error: (error) => {
          console.error('Error publishing product', error);
        }
      });
    }
  }

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
          this.collections = data.data;
          console.log("Table data refreshed:", this.collections);
        },
        error: (error) => {
          console.error("Error fetching collections", error);
        },
      });
  }
}
