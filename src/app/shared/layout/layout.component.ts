import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { SidePanelComponent } from '../side-panel/side-panel.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterModule, SidePanelComponent],
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
