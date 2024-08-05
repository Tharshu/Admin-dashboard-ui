import { Component, inject, OnInit } from '@angular/core';
import { BackButtonComponent } from "../../../shared/back-button/back-button.component";
import { NgbdSortableHeader } from '../products/products.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { Product } from '../../../core/model/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { BackButtonProductComponent } from "../../../shared/back-button-product/back-button-product.component";
import { InventoryService } from '../../../core/services/inventory.service';
import { Inventory } from '../../../core/model/inventory.model';
import { Variant } from '../../../core/model/variant.model';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [BackButtonComponent, NgbdSortableHeader, CommonModule, ReactiveFormsModule, BackButtonProductComponent],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.css'
})
export class InventoryComponent implements OnInit{

  inventoryService = inject(InventoryService);

  form: FormGroup;
  product: Product | any;
  inventory: Inventory | any;
  variants: Variant[] = [];
  selectedVariant: Variant | any;
  productId: any;
  totalqty: any;
  isEditMode = false;


  


  constructor( private fb: FormBuilder,   private modalService: NgbModal, private route: ActivatedRoute) {
    
    this.form = this.fb.group({
      bcode: [''],
      totalQuantity: [0, [Validators.required, Validators.min(1), Validators.max(this.totalqty)]],
      variantTitle: ['', Validators.required],
      variantId: [],
      material: [''],
      title: ['', Validators.required],
      soldQuantity: [0],
      availableQuantity: [0],
      inventoryId: []
    //   bcode: new FormControl(""),
    //   totalQuantity: new FormControl(""),
    //   variantTitle: new FormControl(""),
    //   variantId: new FormControl(""),
    //   material: new FormControl(""),
    //   title: new FormControl(""),
    //   soldQuantity: new FormControl(0),
    //   availableQuantity: new FormControl(""),

    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['product']) {
        this.product = JSON.parse(params['product']);
        console.log("product..",this.product);
        this.getInventoryByProductId(this.product?.id)

        this.productId = this.product.id;
        this.totalqty = this.product.totalCount;

      }
    });

  }

  openModal(editMode: boolean, productId: string | null = null, variant: Variant | null = null) {
    this.isEditMode = editMode;
    this.selectedVariant = variant;
    console.log("selected variant", this.selectedVariant);
    this.productId = productId;
    if (editMode && this.selectedVariant) {
      // Map the variant object to form controls
      this.form.patchValue({
        title: this.selectedVariant.title,
        material: this.selectedVariant.material,
        variantTitle: this.selectedVariant.variant,
        totalQuantity: this.selectedVariant.totalQuantity,
        bcode: '' // Adjust this if there's a corresponding field in your Variant
      });
    } else {
      this.form.reset(); // Reset the form for adding new variant
    }
  }
  

  getInventoryByProductId(productId: string){
    this.inventoryService.getInventoryByProductId(productId).subscribe({
      next: (response) => {
        this.inventory = response.data;
        this.variants = this.inventory?.variantDtoList;
        console.log("Res => ",this.inventory);
      },
      error: (error) => {
        console.error("error getting inventory.");
      }
    },

  );
  }

  addVariant(productId: string) {
    if (this.form.valid) {
      const formValue = this.form.value;
      console.log("Form value variant", formValue);
      
      const variant: Variant[] = [
        {
          variantId: formValue.variantId || null, // Handle undefined inventoryId
          title: formValue.title,
          material: formValue.material,
          variant: formValue.variantTitle,
          totalQuantity: formValue.totalQuantity|| 0,
          soldQuantity: formValue.soldQuantity || 0, // Ensure soldQuantity has a default value
          // availableQuantity: formValue.totalQuantity - (formValue.soldQuantity || 0) || 0,
          inventoryId: formValue.inventoryId || null, // Handle undefined inventoryId
        },
      ];
  
      const payload: Inventory = {
        productId: productId,
        locationId: 1,
        totalQuantity: formValue.totalQuantity|| 0,
        soldQuantity: formValue.soldQuantity || 0, // Ensure soldQuantity has a default value
        availableQuantity: formValue.totalQuantity - (formValue.soldQuantity || 0) || 0,
        variantDtoList: variant,
        inventoryId: formValue.inventoryId || null, // Handle undefined inventoryId
      };
  
      this.inventoryService.createInventory(payload).subscribe({
        next: (response) => {
          this.inventory = response.data;
          console.log("Response => ", this.inventory);
          this.getInventoryByProductId(this.product?.id);
        },
        error: (error) => {
          console.error("Error creating inventory.", error);
        }
      });
    }
  }

  editVariant() {
    throw new Error('Method not implemented.');
    }

}
