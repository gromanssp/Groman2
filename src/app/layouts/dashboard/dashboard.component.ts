import { Component, inject } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { ThemeService } from '../../services/theme.service';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css',
    imports: [SidebarComponent, NavbarComponent, RouterOutlet, AsyncPipe]
})
export class DashboardComponent {
  private sidebarService = inject(SidebarService);
  private themeService = inject(ThemeService);
  collapsed$ = this.sidebarService.collapsed$;
  mobileOpen$ = this.sidebarService.mobileOpen$;

  closeMobile(): void {
    this.sidebarService.closeMobile();
  }
}
