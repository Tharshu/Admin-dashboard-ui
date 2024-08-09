import { Component, inject, OnInit } from '@angular/core';
import { OrdersService } from '../../../core/services/orders.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { OrderRes } from '../../../core/model/orderRes.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit{
orderService = inject(OrdersService);

currentPage = 0;
pageSize = 10;
totalItems = 0;
totalPages = 0;  // To hold total number of pages

form: FormGroup;
orders: OrderRes[] = [];


constructor(private fb: FormBuilder) {
  this.form = this.fb.group({});
}

ngOnInit(): void {
  this.getAllOrders();
}

getAllOrders() {
  this.orderService.getAllOrders(this.currentPage, this.pageSize).subscribe({
    next: (data) => {
      this.orders = data.data.content;
      this.totalItems = data.data.totalElements;
      this.totalPages = Math.ceil(this.totalItems / this.pageSize);  // Calculate total pages
    },
    error: (error) => {
      console.error("Error getting orders.");
    },
  });
}

onPageChange(page: number) {
  this.currentPage = page;
  this.getAllOrders();
}

}
