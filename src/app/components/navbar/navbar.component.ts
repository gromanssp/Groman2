import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SidebarService } from '../../services/sidebar.service';
import { AuthService } from '../../services/auth.service';
import { DonationButtonComponent } from '../../shared/components/donation-button/donation-button.component';
import { AsyncPipe, SlicePipe } from '@angular/common';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.css',
    imports: [DonationButtonComponent, RouterLink, AsyncPipe, SlicePipe]
})
export class NavbarComponent {
  private sidebarService = inject(SidebarService);
  private authService = inject(AuthService);
  private router = inject(Router);

  profile$ = this.authService.profile$;
  user$ = this.authService.user$;
  showUserMenu = false;

  toggleSidebar(): void {
    if (window.innerWidth <= 768) {
      this.sidebarService.toggleMobile();
    } else {
      this.sidebarService.toggle();
    }
  }

  toggleUserMenu(): void {
    this.showUserMenu = !this.showUserMenu;
  }

  async logout(): Promise<void> {
    this.showUserMenu = false;
    await this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
