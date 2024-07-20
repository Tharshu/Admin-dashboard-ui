import { Component } from '@angular/core';
import { BackButtonComponent } from "../../../shared/back-button/back-button.component";

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [BackButtonComponent],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.css'
})
export class InventoryComponent {

}
