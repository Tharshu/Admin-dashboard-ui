import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { SidePanelComponent } from '../side-panel/side-panel.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterModule, SidePanelComponent, CommonModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

  authService = inject(AuthService);
  get isLoggedIn() {
    return this.authService.isLoggedIn();
  }
  // isLoggedIn = this.authService.isLoggedIn();
}
