import { Component } from '@angular/core';
import { BackButtonComponent } from "../../../shared/back-button/back-button.component";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [BackButtonComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

}
