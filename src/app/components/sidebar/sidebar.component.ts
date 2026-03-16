import { Component, inject } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  private sidebarService = inject(SidebarService);
  collapsed$ = this.sidebarService.collapsed$;

  toggle(): void {
    this.sidebarService.toggle();
  }
}
