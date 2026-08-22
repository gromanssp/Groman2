import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ChipComponent } from '../../../../shared/components/chip/chip.component';
import { CodeSnippetComponent } from '../../../../shared/components/code-snippet/code-snippet.component';

@Component({
  selector: 'app-chips-section',
  templateUrl: './chips-section.component.html',
  styleUrl: '../section-shared.css',
  imports: [ChipComponent, CodeSnippetComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChipsSectionComponent {
  protected readonly tags = signal(['angular', 'signals', 'zoneless', 'typescript']);

  protected readonly codes = {
    variants: `<app-chip variant="primary">Primary</app-chip>\n<app-chip variant="success">Success</app-chip>\n<app-chip variant="danger" size="sm">Small</app-chip>`,
    removable: `<app-chip [removable]="true" (removed)="remove(tag)">{{ tag }}</app-chip>`
  };

  protected remove(tag: string): void {
    this.tags.update(list => list.filter(item => item !== tag));
  }

  protected reset(): void {
    this.tags.set(['angular', 'signals', 'zoneless', 'typescript']);
  }
}
