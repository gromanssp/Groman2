import { ChangeDetectionStrategy, Component, computed, input, model, numberAttribute, output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css',
  host: { role: 'navigation', 'aria-label': 'Pagination' },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationComponent {
  /** 1-based current page. */
  readonly page = model(1);
  readonly pageSize = input(10, { transform: numberAttribute });
  readonly total = input(0, { transform: numberAttribute });
  /** Number of page buttons rendered around the current page. */
  readonly siblings = input(1, { transform: numberAttribute });

  readonly pageChange = output<number>();

  readonly totalPages = computed(() => Math.max(1, Math.ceil(this.total() / this.pageSize())));
  protected readonly isFirst = computed(() => this.page() <= 1);
  protected readonly isLast = computed(() => this.page() >= this.totalPages());

  protected readonly rangeLabel = computed(() => {
    const total = this.total();
    if (total === 0) return 'No results';
    const from = (this.page() - 1) * this.pageSize() + 1;
    const to = Math.min(total, this.page() * this.pageSize());
    return `${from}-${to} of ${total}`;
  });

  /** Page buttons with `null` marking an ellipsis gap. */
  protected readonly pages = computed<(number | null)[]>(() => {
    const total = this.totalPages();
    const current = this.page();
    const siblings = this.siblings();
    const items: (number | null)[] = [];
    let previous = 0;

    for (let candidate = 1; candidate <= total; candidate++) {
      const isEdge = candidate === 1 || candidate === total;
      const isNearCurrent = Math.abs(candidate - current) <= siblings;
      if (!isEdge && !isNearCurrent) continue;

      if (previous && candidate - previous > 1) items.push(null);
      items.push(candidate);
      previous = candidate;
    }

    return items;
  });

  protected goTo(page: number): void {
    const clamped = Math.min(this.totalPages(), Math.max(1, page));
    if (clamped === this.page()) return;
    this.page.set(clamped);
    this.pageChange.emit(clamped);
  }
}
