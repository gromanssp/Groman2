import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CodeSnippetComponent } from '../../../../shared/components/code-snippet/code-snippet.component';

interface DirectiveInput {
  name: string;
  type: string;
  default: string;
  description: string;
}

interface DirectiveDoc {
  name: string;
  selector: string;
  description: string;
  inputs: DirectiveInput[];
  outputs?: DirectiveInput[];
  usage: string;
}

@Component({
  selector: 'app-directives-section',
  templateUrl: './directives-section.component.html',
  styleUrl: './directives-section.component.css',
  imports: [CodeSnippetComponent, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DirectivesSectionComponent {
  readonly barrelUsage = `import { UI_DIRECTIVES } from '../../directives';

@Component({
  // Spread the whole kit instead of importing them one by one
  imports: [...UI_DIRECTIVES]
})
export class MyComponent {}`;

  readonly directives: DirectiveDoc[] = [
    {
      name: 'LetDirective',
      selector: '*appLet',
      description:
        'Aliases an expression inside a template without an artificial @if. Unlike @if, falsy values (0, empty string, false) still render, which makes it safe for counts and flags.',
      inputs: [{ name: 'appLet', type: 'T', default: '(required)', description: 'The expression to alias' }],
      usage: `<ng-container *appLet="filteredRows() as rows">
  {{ rows.length }} results
</ng-container>`
    },
    {
      name: 'ClickOutsideDirective',
      selector: '[appClickOutside]',
      description:
        'Emits when a pointer event lands outside the host. Replaces the hand-rolled document:click listener that every dropdown, menu and popover used to duplicate. The listener is registered in capture phase, so it still fires when inner handlers stop propagation.',
      inputs: [
        { name: 'appClickOutside', type: 'boolean', default: 'true', description: 'Set to false to stop listening while the panel is closed' }
      ],
      outputs: [{ name: 'clickOutside', type: 'Event', default: '-', description: 'Emitted on each outside pointerdown' }],
      usage: `<div [appClickOutside]="open()" (clickOutside)="open.set(false)">
  <button (click)="open.set(true)">Menu</button>
</div>`
    },
    {
      name: 'AutofocusDirective',
      selector: '[appAutofocus]',
      description:
        'Focuses the host after it is rendered, so the keyboard lands inside a modal or drawer instead of behind it.',
      inputs: [
        { name: 'appAutofocus', type: 'boolean', default: 'true', description: 'Whether to focus at all' },
        { name: 'focusDelay', type: 'number', default: '0', description: 'Milliseconds to wait, for elements that animate in' }
      ],
      usage: `<div role="dialog" appAutofocus tabindex="-1"> ... </div>`
    },
    {
      name: 'RippleDirective',
      selector: '[appRipple]',
      description:
        'Material-style click feedback themed with the active accent. It only appends and removes a DOM node - no component state changes - so it stays free under zoneless change detection.',
      inputs: [
        { name: 'rippleDisabled', type: 'boolean', default: 'false', description: 'Suppresses the effect' },
        { name: 'rippleColor', type: 'string', default: "'rgba(255,255,255,0.35)'", description: 'Ripple color' }
      ],
      usage: `<button class="btn btn-gradient" appRipple>Save</button>`
    },
    {
      name: 'LazyImgDirective',
      selector: 'img[appLazyImg]',
      description:
        'Defers the image request until the element scrolls near the viewport, using an IntersectionObserver that disconnects after the first hit.',
      inputs: [
        { name: 'appLazyImg', type: 'string', default: '(required)', description: 'The real image URL' },
        { name: 'rootMargin', type: 'string', default: "'200px'", description: 'How early loading starts' }
      ],
      outputs: [{ name: 'loaded', type: 'void', default: '-', description: 'Emitted once the image has decoded' }],
      usage: `<img [appLazyImg]="product.image" alt="Product photo" />`
    },
    {
      name: 'CellTemplateDirective',
      selector: '[appCellTemplate]',
      description:
        'Registers a custom renderer for one app-data-table column. The template context exposes the cell value as $implicit, plus row and index.',
      inputs: [{ name: 'appCellTemplate', type: 'string', default: '(required)', description: 'Key of the column to render' }],
      usage: `<app-data-table [columns]="columns" [rows]="rows">
  <ng-template appCellTemplate="status" let-value let-row="row">
    <app-badge [variant]="value === 'Active' ? 'success' : 'secondary'">
      {{ value }}
    </app-badge>
  </ng-template>
</app-data-table>`
    },
    {
      name: 'SkeletonDirective',
      selector: '[appSkeleton]',
      description:
        'Masks any block with a shimmering placeholder while its data loads. The content stays in the DOM so the layout does not jump, and it is hidden from screen readers via aria-hidden and aria-busy.',
      inputs: [{ name: 'appSkeleton', type: 'boolean', default: 'false', description: 'Whether the block is loading' }],
      usage: `<h3 [appSkeleton]="loading()">{{ user().name }}</h3>
<p [appSkeleton]="loading()">{{ user().email }}</p>`
    },
    {
      name: 'PermissionDirective',
      selector: '*appPermission',
      description:
        'Renders the host template only when the signed-in user holds one of the given roles. This is a UX affordance, not a security boundary - guard the route with authGuard and enforce the same rule on the API.',
      inputs: [
        { name: 'appPermission', type: "UserRole | UserRole[]", default: '(required)', description: 'Role or roles allowed to see the content' }
      ],
      usage: `<button *appPermission="'admin'" class="btn btn-danger">Delete workspace</button>
<nav *appPermission="['admin', 'editor']"> ... </nav>`
    },
    {
      name: 'TooltipDirective',
      selector: '[appTooltip]',
      description:
        'Text tooltip rendered into document.body, so it is never clipped by an overflow:hidden ancestor - which is what makes it work inside the collapsed sidebar and inside table cells. Shows on hover and on keyboard focus.',
      inputs: [
        { name: 'appTooltip', type: 'string', default: "''", description: 'Tooltip text; an empty string disables it' },
        { name: 'tooltipPosition', type: "'top' | 'bottom' | 'left' | 'right'", default: "'top'", description: 'Placement relative to the host' }
      ],
      usage: `<button appTooltip="Saves without leaving the page" tooltipPosition="bottom">
  Save
</button>`
    },
    {
      name: 'CollapseDirective',
      selector: '[appCollapse]',
      description:
        'Animates a block between collapsed and expanded using its measured height. The effect only writes styles, so it never schedules change detection.',
      inputs: [{ name: 'appCollapse', type: 'boolean', default: 'false', description: 'When true, the element is collapsed' }],
      usage: `<div [appCollapse]="!panelOpen()">
  <p>This content collapses and expands smoothly.</p>
</div>`
    }
  ];
}
