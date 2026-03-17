import { Component } from '@angular/core';
import { CodeSnippetComponent } from '../../../../shared/components/code-snippet/code-snippet.component';
import { ModalComponent } from '../../../../shared/components/modal/modal.component';

@Component({
    selector: 'app-modals-section',
    templateUrl: './modals-section.component.html',
    styleUrl: './modals-section.component.css',
    imports: [CodeSnippetComponent, ModalComponent]
})
export class ModalsSectionComponent {
  showSmall = false;
  showMedium = false;
  showLarge = false;

  codes = {
    small: `<app-modal [isOpen]="showSmall" title="Small Modal"\n  size="sm" (closed)="showSmall = false">\n  <p>Content here...</p>\n</app-modal>`,
    medium: `<app-modal [isOpen]="showMedium" title="Medium Modal"\n  size="md" (closed)="showMedium = false">\n  <p>Content here...</p>\n</app-modal>`,
    large: `<app-modal [isOpen]="showLarge" title="Large Modal"\n  size="lg" (closed)="showLarge = false">\n  <p>Content here...</p>\n</app-modal>`
  };
}
