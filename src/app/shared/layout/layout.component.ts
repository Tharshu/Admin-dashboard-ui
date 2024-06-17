import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterModule],
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
