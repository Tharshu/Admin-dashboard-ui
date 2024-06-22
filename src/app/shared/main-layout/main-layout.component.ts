import { Component, inject } from '@angular/core';
import { SidePanelComponent } from '../side-panel/side-panel.component';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { ToastComponent } from "../toast/toast.component";

@Component({
    selector: 'app-main-layout',
    standalone: true,
    templateUrl: './main-layout.component.html',
    styleUrl: './main-layout.component.css',
    imports: [SidePanelComponent, RouterModule, ToastComponent]
})
export class MainLayoutComponent {

  authService = inject(AuthService);
  logout(){
    this.authService.logout();
  }

}
