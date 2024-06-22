import { Component } from '@angular/core';
import { LayoutComponent } from '../layout/layout.component';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-side-panel',
  standalone: true,
  imports: [LayoutComponent,RouterModule],
  templateUrl: './side-panel.component.html',
  styleUrl: './side-panel.component.css'
})
export class SidePanelComponent {

}
