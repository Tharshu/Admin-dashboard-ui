import { Component, inject, OnInit } from "@angular/core";
import { BackButtonComponent } from "../../../shared/back-button/back-button.component";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { CommonModule } from "@angular/common";
import { ProductService } from "../../../core/services/product.service";
import { Currencies, Price, Product } from "../../../core/model/common.model";
import { CurrencyService } from "../../../core/services/currency.service";
import { response } from "express";
import { PriceService } from "../../../core/services/price.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-currencies",
  standalone: true,
  imports: [BackButtonComponent, CommonModule, ReactiveFormsModule],
  templateUrl: "./currencies.component.html",
  styleUrl: "./currencies.component.css",
})
export class CurrenciesComponent implements OnInit {

  productService = inject(ProductService);
  currencyService = inject(CurrencyService);
  priceService = inject(PriceService);
  form: FormGroup;
  currencyform: FormGroup;
  products: Product[] = [];
  currencies: Currencies[] = [];
  prices: Price[] = [];
  currentPage = 0;
  pageSize = 100;
  totalItems = 0;
  collections: any;
  totalPagesArray: any;
  totalPages: any;


  constructor(private fb: FormBuilder,private router: Router) {
    this.form = this.fb.group({
      // amount: new FormControl(""),
      amount: ["", [Validators.required, Validators.min(0)]],
      // productId: new FormControl(""),
      product: ['', Validators.required],
      location: new FormControl(""),
      currency: ['', Validators.required],
      // currencyId: new FormControl(""),
    });
    this.currencyform = this.fb.group({
      code: new FormControl(""),
      name: new FormControl(""),
      symbol: new FormControl(""),
      imageUrl: new FormControl(""),
    });
  }
  ngOnInit(): void {
    this.getAllProduct();
    this.getAllCurrency();
    this.getAllPrices();
  }


  onSubmit(): void {

        if (this.form.valid) {
          const formValue = this.form.value;
          console.log("Selected form value:", formValue);
      
          const selectedProduct = this.products.find(
            (product) => product.id === formValue.product
          );
          console.log("Selected Product:", selectedProduct);
      
          const selectedCurrency = this.currencies.find(
            (currency) => currency.currencyId === +formValue.currency  
          );
          console.log("Selected Currency:", selectedCurrency);
      
          if (selectedProduct && selectedCurrency) {
            const payload: Price = {
              priceId: 0,
              currencyId: {
                currencyId: selectedCurrency.currencyId,
                code: selectedCurrency.code,
                name: selectedCurrency.name,
                symbol: selectedCurrency.symbol,
                imageUrl: selectedCurrency.imageUrl,
              },
              locationId: formValue.location,
              amount: formValue.amount,
              productId: selectedProduct.id,
            };
            console.log("Payload Price:", payload);
    
        this.priceService.createPrice(payload).subscribe({
          next: (response) => {
            console.log("Price created successfully", response);
            this.ngOnInit();
          },
          error: (error) => {
            console.error("Error creating Price", error);
          },
        });
      } else {
        console.error("Product or Currency not found");
      }
    }
  }

  createCurrency() {
    if (this.currencyform.valid) {
      const formValue = this.currencyform.value;
      console.log("form value", formValue);
      console.log("form value", this.currencyform.value);
      const payload: Currencies = {
        ...formValue,
        currencyId: 0,
        code: formValue.code,
        name: formValue.name,
        symbol: formValue.symbol,
      };
      console.log("payload currency", payload);
      this.currencyService.createCurrency(payload).subscribe({
        next: (response) => {
          console.log("Currency created successfully", response);
          this.form.reset();  // Clear the form fields
          window.location.reload();  // Reload the entire window
          this.goBack();
        },
        error: (error) => {
          console.error("Error creating product", error);
        },
      });
    }
  }

  getAllProduct() {
    this.productService.getAllProductFilter().subscribe({
      next: (data) => {
        this.products = data.data.content;
        console.log("Table data refreshed:", this.products);
      },
      error: (error) => {
        console.error("Error fetching products", error);
      },
    });
  }

  getAllCurrency() {
    this.currencyService
      .getAllCurrencies(this.currentPage, this.pageSize)
      .subscribe({
        next: (data) => {
          this.currencies = data.data;
          console.log("Table data refreshed:", this.currencies);
        },
        error: (error) => {
          console.error("Error fetching collections", error);
        },
      });
  }

  getAllPrices() {
    this.priceService.getAllPrice(this.currentPage, this.pageSize).subscribe({
      next: (data) => {
        this.prices = data.data;
        console.log("Table data refreshed:", this.prices);

      },
      error: (error) => {
        console.error("Error fetching prices", error);
      },
    });
  }

  goBack() {
    this.router.navigate(['/settings/currencies']);
  }

}
