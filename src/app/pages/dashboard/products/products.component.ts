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
import { ProductCollection } from "../../../core/model/common.model";
import { response } from "express";
import { error } from "console";

interface Country {
  name: string;
  flag: string;
  area: number;
  population: number;
}

// const COUNTRIES: Country[] = [
//   {
//     name: "Russia",
//     flag: "f/f3/Flag_of_Russia.svg",
//     area: 17075200,
//     population: 146989754,
//   },
//   {
//     name: "Canada",
//     flag: "c/cf/Flag_of_Canada.svg",
//     area: 9976140,
//     population: 36624199,
//   },
//   {
//     name: "United States",
//     flag: "a/a4/Flag_of_the_United_States.svg",
//     area: 9629091,
//     population: 324459463,
//   },
//   {
//     name: "China",
//     flag: "f/fa/Flag_of_the_People%27s_Republic_of_China.svg",
//     area: 9596960,
//     population: 1409517397,
//   },
// ];

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
  ngOnInit(): void {
    this.productService.getAllCollection(this.currentPage,this.pageSize).subscribe({
      next: (response) => {
        this.collections = response.data;
      },
      error: (error) => {
        console.error("Error fetching users:", error);
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
          this.getFormData();
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
    if (confirm(`Are you sure you want to delete collection "${collection.title}"?`)) {

      let id: string = collection.id;
      console.log("collection id {}",id);
      this.productService.deleteCollection(id).subscribe({
        next: () => {
          console.log(`Collection "${collection.title}" deleted successfully.`);
          this.getFormData(); // Refresh the table data after deletion
        },
        error: (error) => {
          console.error(`Error deleting collection "${collection.title}"`, error);
        }
      });
    }
  }

  getFormData() {
    this.productService.getAllCollection(this.currentPage, this.pageSize).subscribe({
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
    this.getFormData();
  }

  trackById(index: number, item: ProductCollection) {
    return item.id; // Replace with your unique identifier for collections
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }

  get totalPagesArray(): number[] {
    return Array(this.totalPages).fill(0).map((x, i) => i);
  }

  navigateToNewProduct() {
    this.router.navigate(["/new-product"]);
  }

  // countries = ProductCollection;

  @ViewChildren(NgbdSortableHeader)
  headers!: QueryList<NgbdSortableHeader>;

  onSort({ column, direction }: SortEvent) {
    // resetting other headers
    for (const header of this.headers) {
      if (header.sortable !== column) {
        header.direction = "";
      }
    }

    // sorting countries
    // if (direction === "" || column === "") {
    //   this.countries = ProductCollection;
    // } else {
    //   this.countries = [...COUNTRIES].sort((a, b) => {
    //     const res = compare(a[column], b[column]);
    //     return direction === "asc" ? res : -res;
    //   });
    // }
  }
}
