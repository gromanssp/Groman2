import { Component, inject } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  private sidebarService = inject(SidebarService);
  collapsed$ = this.sidebarService.collapsed$;
  mobileOpen$ = this.sidebarService.mobileOpen$;

  closeMobile(): void {
    this.sidebarService.closeMobile();
  }
}
