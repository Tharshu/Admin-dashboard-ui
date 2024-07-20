import { CommonModule, DecimalPipe } from "@angular/common";
import {
  Component,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChild,
  ViewChildren,
  inject,
} from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { ProductService } from "../../../core/services/product.service";
import {
  Product,
  ProductCollection,
  ProductType,
} from "../../../core/model/common.model";
import { response } from "express";
import { Console, error } from "console";

interface Country {
  name: string;
  flag: string;
  area: number;
  population: number;
}
export type SortColumn = keyof ProductCollection | "";
export type SortDirection = "asc" | "desc" | "";
const rotate: { [key: string]: SortDirection } = {
  asc: "desc",
  desc: "",
  "": "asc",
};

const compare = (v1: string | number, v2: string | number) =>
  v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

export interface SortEvent {
  column: SortColumn;
  direction: SortDirection;
}

@Directive({
  selector: "th[sortable]",
  standalone: true,
  host: {
    "[class.asc]": 'direction === "asc"',
    "[class.desc]": 'direction === "desc"',
    "(click)": "rotate()",
  },
})
export class NgbdSortableHeader {
  @Input() sortable: SortColumn = "";
  @Input() direction: SortDirection = "";
  @Output() sort = new EventEmitter<SortEvent>();

  rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({ column: this.sortable, direction: this.direction });
  }
}

@Component({
  selector: "app-products",
  standalone: true,
  imports: [DecimalPipe, NgbdSortableHeader, CommonModule, ReactiveFormsModule],
  templateUrl: "./products.component.html",
  styleUrl: "./products.component.css",
})
export class ProductsComponent implements OnInit {
  collectionForm: FormGroup;
  private modalRef?: NgbModalRef;
  productService = inject(ProductService);
  collections: ProductCollection[] = [];
  type: ProductType[] = [];
  products: Product[] = [];
  product: Product | undefined;
  res: String | undefined;
  currentPage = 0;
  pageSize = 10;
  totalItems = 0;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private modalService: NgbModal
  ) {
    this.collectionForm = this.fb.group({
      title: new FormControl("", [Validators.required]),
      handle: new FormControl(""),
      // metaKey: [''],
      metaValue: new FormControl(""),
    });
  }
  togglePopover(product: any): void {
    // Toggle popover state for the product
    product.showPopover = !product.showPopover;
  }
  editProduct(_t21: Product, id:String) {
    this.productService.editProduct(_t21,id).subscribe(
      {
        next: (response) => {
          this.product = response.data;
          this.getAllProduct();
        },
        error: (error) => {
          console.error("error updating product", error)
        }
      }
    )
  }
  deleteProduct(_id: String) {
    this.productService.deleteProduct(_id).subscribe(
      {
        next: (response) => {
          this.res = response.data;
          this.getAllProduct();
        },
        error: (error) => {
          console.error("error deleting product", error)
        }
      }
    )
  }

  duplicateProduct(_t21: Product) {
    throw new Error("Method not implemented.");
  }
  changeStatus(id: String,status: String) {
    this.productService.changeStatus(id,status).subscribe(
      {
        next: (response) => {
          this.res = response.data;
          console.log("Res => ",this.res);
          this.getAllProduct();
        },
        error: (error) => {
          console.error("error updating status.");
        }
      }
    )
  }
  ngOnInit(): void {
    this.getAllProduct();
    this.productService
      .getAllCollection(this.currentPage, this.pageSize)
      .subscribe({
        next: (response) => {
          this.collections = response.data;
        },
        error: (error) => {
          console.error("Error fetching users:", error);
        },
      });
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

  jsonValidator(control: FormControl) {
    try {
      JSON.parse(control.value);
      return null; // valid JSON
    } catch (e) {
      return { jsonInvalid: true }; // invalid JSON
    }
  }

  onSubmitCollection() {
    if (this.collectionForm.valid) {
      console.log(this.collectionForm.value);
      const formValue = this.collectionForm.value;

      const payload: ProductCollection = {
        title: formValue.title,
        handle: formValue.handle,
        isActive: true,
        id: "",
        createdAt: "",
        updatedAt: "",
      };

      this.productService.createCollection(payload).subscribe({
        next: (response) => {
          console.log("Successfully created collection!", response);
          this.getCollectionData();
          if (this.modalRef) {
            this.modalRef.close();
          }
        },
        error: (error) => {
          console.error("Error while creating collection", error);
        },
      });
    }
  }

  onDeleteCollection(collection: ProductCollection) {
    if (
      confirm(
        `Are you sure you want to delete collection "${collection.title}"?`
      )
    ) {
      let id: string = collection.id;
      console.log("collection id {}", id);
      this.productService.deleteCollection(id).subscribe({
        next: () => {
          console.log(`Collection "${collection.title}" deleted successfully.`);
          this.getCollectionData(); // Refresh the table data after deletion
        },
        error: (error) => {
          console.error(
            `Error deleting collection "${collection.title}"`,
            error
          );
        },
      });
    }
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

  onPageChange(page: number) {
    this.currentPage = page;
    this.getCollectionData();
  }

  trackById(index: number, item: ProductCollection) {
    return item.id; // Replace with your unique identifier for collections
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }

  get totalPagesArray(): number[] {
    return Array(this.totalPages)
      .fill(0)
      .map((x, i) => i);
  }

  navigateToNewProduct() {
    this.router.navigate(["/new-product"]);
  }

  @ViewChildren(NgbdSortableHeader)
  headers!: QueryList<NgbdSortableHeader>;

  onSort({ column, direction }: SortEvent) {
    // resetting other headers
    for (const header of this.headers) {
      if (header.sortable !== column) {
        header.direction = "";
      }
    }
  }
}
