import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { CodeSnippetComponent } from '../../../../shared/components/code-snippet/code-snippet.component';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination.component';

@Component({
  selector: 'app-pagination-section',
  templateUrl: './pagination-section.component.html',
  styleUrl: '../section-shared.css',
  imports: [PaginationComponent, CodeSnippetComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationSectionComponent {
  protected readonly page = signal(1);
  protected readonly largePage = signal(12);

  private readonly items = Array.from({ length: 47 }, (_, i) => `Record #${i + 1}`);
  protected readonly total = this.items.length;

  protected readonly visible = computed(() => {
    const start = (this.page() - 1) * 5;
    return this.items.slice(start, start + 5);
  });

  protected readonly codes = {
    basic: `<app-pagination [(page)]="page" [pageSize]="5" [total]="total" />`,
    large: `<!-- Ellipsis appears automatically for long ranges -->\n<app-pagination [(page)]="page" [pageSize]="10" [total]="2400" [siblings]="2" />`
  };
}
