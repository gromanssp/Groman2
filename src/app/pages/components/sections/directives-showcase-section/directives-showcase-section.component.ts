import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CodeSnippetComponent } from '../../../../shared/components/code-snippet/code-snippet.component';
import { UI_DIRECTIVES } from '../../../../directives';

@Component({
  selector: 'app-directives-showcase-section',
  templateUrl: './directives-showcase-section.component.html',
  styleUrl: '../section-shared.css',
  imports: [...UI_DIRECTIVES, CodeSnippetComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DirectivesShowcaseSectionComponent {
  protected readonly panelOpen = signal(true);
  protected readonly loading = signal(true);
  protected readonly outsideClicks = signal(0);
  protected readonly menuOpen = signal(false);

  protected readonly totals = signal({ revenue: 48250, orders: 312 });

  protected readonly codes = {
    let: `<ng-container *appLet="totals() as t">\n  {{ t.orders }} orders · {{ t.revenue }} USD\n</ng-container>`,
    clickOutside: `<div [appClickOutside]="menuOpen()" (clickOutside)="menuOpen.set(false)">…</div>`,
    ripple: `<button class="btn btn-gradient" appRipple>Click me</button>`,
    tooltip: `<button appTooltip="Saves without leaving the page" tooltipPosition="top">Save</button>`,
    collapse: `<div [appCollapse]="!panelOpen()">…</div>`,
    skeleton: `<p [appSkeleton]="loading()">{{ user().email }}</p>`,
    permission: `<button *appPermission="'admin'" class="btn btn-danger">Delete workspace</button>`,
    lazyImg: `<img [appLazyImg]="product.image" alt="Product" />`
  };
}
