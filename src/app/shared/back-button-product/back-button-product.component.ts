import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-back-button-product',
  standalone: true,
  imports: [],
  templateUrl: './back-button-product.component.html',
  styleUrl: './back-button-product.component.css'
})
export class BackButtonProductComponent {
  constructor(private router: Router) { }
  
  goBack() {
    this.router.navigate(['/products']);
  }

}
