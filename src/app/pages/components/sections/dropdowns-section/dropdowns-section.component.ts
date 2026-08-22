import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CodeSnippetComponent } from '../../../../shared/components/code-snippet/code-snippet.component';
import { DropdownComponent } from '../../../../shared/components/dropdown/dropdown.component';

@Component({
  selector: 'app-dropdowns-section',
  templateUrl: './dropdowns-section.component.html',
  styleUrl: '../section-shared.css',
  imports: [DropdownComponent, CodeSnippetComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropdownsSectionComponent {
  protected readonly lastAction = signal('none');

  protected readonly codes = {
    basic: `<app-dropdown>\n  <button dropdown-trigger class="btn btn-secondary">Actions</button>\n  <button class="dropdown-item" (click)="edit()">Edit</button>\n  <button class="dropdown-item" (click)="duplicate()">Duplicate</button>\n  <div class="dropdown-divider"></div>\n  <button class="dropdown-item" (click)="remove()">Delete</button>\n</app-dropdown>`,
    align: `<app-dropdown align="start" panelWidth="240px" [closeOnSelect]="false">…</app-dropdown>`
  };

  protected run(action: string): void {
    this.lastAction.set(action);
  }
}
