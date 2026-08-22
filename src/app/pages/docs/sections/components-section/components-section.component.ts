import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CodeSnippetComponent } from '../../../../shared/components/code-snippet/code-snippet.component';

interface ComponentInput {
  name: string;
  type: string;
  default: string;
  description: string;
}

interface ComponentOutput {
  name: string;
  type: string;
  description: string;
}

interface ComponentDoc {
  name: string;
  selector: string;
  category: 'shared' | 'core';
  description: string;
  inputs: ComponentInput[];
  outputs: ComponentOutput[];
  usage: string;
}

@Component({
  selector: 'app-components-section',
  standalone: true,
  templateUrl: './components-section.component.html',
  styleUrl: './components-section.component.css',
  imports: [CodeSnippetComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentsSectionComponent {
  readonly sharedComponents: ComponentDoc[] = [
    {
      name: 'BadgeComponent',
      selector: 'app-badge',
      category: 'shared',
      description: 'Displays a styled badge label with configurable variant and size.',
      inputs: [
        { name: 'variant', type: "'primary' | 'success' | 'warning' | 'danger' | 'secondary' | 'outline'", default: "'primary'", description: 'Color variant of the badge' },
        { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Size of the badge' }
      ],
      outputs: [],
      usage: '<app-badge variant="success" size="sm">Active</app-badge>'
    },
    {
      name: 'ModalComponent',
      selector: 'app-modal',
      category: 'shared',
      description: 'A modal dialog with backdrop overlay, configurable title and size.',
      inputs: [
        { name: 'isOpen', type: 'model<boolean>', default: 'false', description: 'Two-way: [(isOpen)]="showModal" closes the dialog with no extra wiring' },
        { name: 'closeOnBackdrop', type: 'boolean', default: 'true', description: 'Whether clicking the backdrop closes the dialog' },
        { name: 'title', type: 'string', default: "''", description: 'Title displayed in the modal header' },
        { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Width of the modal dialog' }
      ],
      outputs: [
        { name: 'closed', type: 'void', description: 'Emitted when the modal is closed' }
      ],
      usage: `<app-modal [isOpen]="showModal" title="Confirm" (closed)="showModal = false">
  <p>Modal content goes here.</p>
</app-modal>`
    },
    {
      name: 'CollapsePanelComponent',
      selector: 'app-collapse-panel',
      category: 'shared',
      description: 'An expandable/collapsible panel with a clickable title header.',
      inputs: [
        { name: 'title', type: 'string', default: "''", description: 'Text displayed in the panel header' },
        { name: 'expanded', type: 'model<boolean>', default: 'false', description: 'Two-way, so a parent can drive an accordion from a single signal' }
      ],
      outputs: [],
      usage: `<app-collapse-panel title="Details" [expanded]="true">
  <p>Collapsible content here.</p>
</app-collapse-panel>`
    },
    {
      name: 'ProgressBarComponent',
      selector: 'app-progress-bar',
      category: 'shared',
      description: 'A progress bar with optional stripes, animation, and label.',
      inputs: [
        { name: 'value', type: 'number', default: '0', description: 'Current progress value (0-100)' },
        { name: 'variant', type: "'primary' | 'success' | 'warning' | 'danger'", default: "'primary'", description: 'Color variant' },
        { name: 'striped', type: 'boolean', default: 'false', description: 'Show striped pattern' },
        { name: 'animated', type: 'boolean', default: 'false', description: 'Animate the stripes' },
        { name: 'height', type: 'number', default: '8', description: 'Height in pixels' },
        { name: 'label', type: 'string', default: "''", description: 'Optional text label' }
      ],
      outputs: [],
      usage: '<app-progress-bar [value]="75" variant="success" [striped]="true"></app-progress-bar>'
    },
    {
      name: 'DataTableComponent',
      selector: 'app-data-table',
      category: 'shared',
      description: 'A configurable data table with column definitions and row styling options.',
      inputs: [
        { name: 'columns', type: 'TableColumn[]', default: '[]', description: 'Column definitions; set sortable to enable header sorting' },
        { name: 'rows', type: 'TableRow[]', default: '[]', description: 'Row data (renamed from data)' },
        { name: 'searchable', type: 'boolean', default: 'false', description: 'Show the search box and filter across all columns' },
        { name: 'pageSize', type: 'number', default: '0', description: 'Rows per page; 0 disables pagination' },
        { name: 'loading', type: 'boolean', default: 'false', description: 'Render shimmering placeholder rows' },
        { name: 'emptyMessage', type: 'string', default: "'No records found'", description: 'Title of the built-in empty state' },
        { name: 'sort', type: 'model<SortState | null>', default: 'null', description: 'Current sort key and direction' },
        { name: 'page', type: 'model<number>', default: '1', description: '1-based current page' },
        { name: 'striped', type: 'boolean', default: 'false', description: 'Alternate row background colors' },
        { name: 'hover', type: 'boolean', default: 'true', description: 'Highlight rows on hover' },
        { name: 'bordered', type: 'boolean', default: 'false', description: 'Show cell borders' }
      ],
      outputs: [],
      usage: '<app-data-table [columns]="cols" [data]="rows" [striped]="true"></app-data-table>'
    },
    {
      name: 'CodeSnippetComponent',
      selector: 'app-code-snippet',
      category: 'shared',
      description: 'Displays formatted code with a copy-to-clipboard button.',
      inputs: [
        { name: 'code', type: 'string', default: "''", description: 'The code string to display' }
      ],
      outputs: [],
      usage: `<app-code-snippet [code]="'const x = 42;'"></app-code-snippet>`
    },
    {
      name: 'SpinnerComponent',
      selector: 'app-spinner',
      category: 'shared',
      description: 'A loading spinner with multiple animation variants.',
      inputs: [
        { name: 'variant', type: "'circular' | 'dots' | 'pulse'", default: "'circular'", description: 'Animation style' },
        { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Spinner size' },
        { name: 'color', type: 'string', default: "var(--accent-primary)", description: 'Custom color value' }
      ],
      outputs: [],
      usage: '<app-spinner variant="dots" size="lg"></app-spinner>'
    },
    {
      name: 'DonationButtonComponent',
      selector: 'app-donation-button',
      category: 'shared',
      description: 'A styled donation call-to-action button with compact mode.',
      inputs: [
        { name: 'compact', type: 'boolean', default: 'false', description: 'Use compact layout' }
      ],
      outputs: [],
      usage: '<app-donation-button [compact]="true"></app-donation-button>'
    },
    {
      name: 'DatePickerComponent',
      selector: 'app-date-picker',
      category: 'shared',
      description: 'A date picker supporting single date, range, and min/max selection modes.',
      inputs: [
        { name: 'mode', type: "'single' | 'range' | 'minmax'", default: "'single'", description: 'Selection mode' },
        { name: 'value', type: 'Date | null', default: 'null', description: 'Selected date (single mode)' },
        { name: 'rangeStart', type: 'Date | null', default: 'null', description: 'Start of selected range' },
        { name: 'rangeEnd', type: 'Date | null', default: 'null', description: 'End of selected range' },
        { name: 'minDate', type: 'Date | null', default: 'null', description: 'Minimum selectable date' },
        { name: 'maxDate', type: 'Date | null', default: 'null', description: 'Maximum selectable date' },
        { name: 'placeholder', type: 'string', default: "'Select date'", description: 'Placeholder text' }
      ],
      outputs: [
        { name: 'dateChange', type: 'Date', description: 'Emitted when a single date is selected' },
        { name: 'rangeChange', type: '{start: Date, end: Date}', description: 'Emitted when a date range is selected' }
      ],
      usage: '<app-date-picker mode="range" (rangeChange)="onRange($event)" />'
    },
    {
      name: 'AlertComponent',
      selector: 'app-alert',
      category: 'shared',
      description: 'Inline message for validation results, quota warnings and system notices.',
      inputs: [
        { name: 'variant', type: "'success' | 'warning' | 'danger' | 'info'", default: "'info'", description: 'Color variant' },
        { name: 'title', type: 'string', default: "''", description: 'Optional bold heading' },
        { name: 'dismissible', type: 'boolean', default: 'false', description: 'Show a close button' },
        { name: 'visible', type: 'model<boolean>', default: 'true', description: 'Two-way visibility' }
      ],
      outputs: [{ name: 'dismissed', type: 'void', description: 'Emitted when the alert is closed' }],
      usage: '<app-alert variant="warning" title="Heads up" [dismissible]="true">Quota is at 80%.</app-alert>'
    },
    {
      name: 'ToastComponent / ToastHostComponent',
      selector: 'app-toast-host',
      category: 'shared',
      description:
        'Transient notifications. Mount <app-toast-host /> once per layout and push messages through ToastService; the queue is a signal, so the host re-renders with no manual change detection.',
      inputs: [],
      outputs: [],
      usage: `// In the layout template
<app-toast-host />

// Anywhere else
private readonly toasts = inject(ToastService);
this.toasts.success('Profile saved', { message: 'Your changes are live.' });`
    },
    {
      name: 'SkeletonComponent',
      selector: 'app-skeleton',
      category: 'shared',
      description: 'Standalone loading placeholder. Use the appSkeleton directive instead when you want to keep the real content in the DOM.',
      inputs: [
        { name: 'shape', type: "'text' | 'circle' | 'block'", default: "'text'", description: 'Placeholder shape' },
        { name: 'width', type: 'string', default: "'100%'", description: 'CSS width' },
        { name: 'height', type: 'string', default: "'1rem'", description: 'CSS height' },
        { name: 'lines', type: 'number', default: '1', description: 'Number of stacked lines' },
        { name: 'lastLineWidth', type: 'string', default: "'70%'", description: 'Shortens the last line so text blocks read like a paragraph' }
      ],
      outputs: [],
      usage: '<app-skeleton [lines]="3" />'
    },
    {
      name: 'EmptyStateComponent',
      selector: 'app-empty-state',
      category: 'shared',
      description: 'Shown when a list, table or search has nothing to display. Project [empty-icon] and [empty-action] to customise it.',
      inputs: [
        { name: 'title', type: 'string', default: "'Nothing here yet'", description: 'Headline' },
        { name: 'description', type: 'string', default: "''", description: 'Supporting sentence' }
      ],
      outputs: [],
      usage: `<app-empty-state title="No projects yet" description="Create one to get started.">
  <button empty-action class="btn btn-gradient">New project</button>
</app-empty-state>`
    },
    {
      name: 'TabsComponent',
      selector: 'app-tabs',
      category: 'shared',
      description:
        'Accessible tab set following the WAI-ARIA tabs pattern (arrows, Home, End). Panels are templates, so an unopened tab renders nothing.',
      inputs: [
        { name: 'selectedIndex', type: 'model<number>', default: '0', description: 'Active tab index' },
        { name: 'variant', type: "'line' | 'pill'", default: "'line'", description: 'Visual style' }
      ],
      outputs: [{ name: 'selectedChange', type: 'number', description: 'Emitted when the active tab changes' }],
      usage: `<app-tabs variant="pill">
  <ng-template appTab="Overview">Panel one</ng-template>
  <ng-template appTab="Archived" [tabDisabled]="true">Panel two</ng-template>
</app-tabs>`
    },
    {
      name: 'DropdownComponent',
      selector: 'app-dropdown',
      category: 'shared',
      description: 'Generic anchored panel. Project the trigger with [dropdown-trigger]; outside clicks are handled by appClickOutside.',
      inputs: [
        { name: 'open', type: 'model<boolean>', default: 'false', description: 'Panel visibility' },
        { name: 'align', type: "'start' | 'end'", default: "'end'", description: 'Horizontal alignment' },
        { name: 'panelWidth', type: 'string', default: "'auto'", description: 'CSS width of the panel' },
        { name: 'closeOnSelect', type: 'boolean', default: 'true', description: 'Close as soon as something inside is clicked' }
      ],
      outputs: [],
      usage: `<app-dropdown>
  <button dropdown-trigger class="btn btn-secondary">Actions</button>
  <a class="dropdown-item" routerLink="/profile">Profile</a>
</app-dropdown>`
    },
    {
      name: 'DrawerComponent',
      selector: 'app-drawer',
      category: 'shared',
      description: 'Off-canvas panel for filters, record details and secondary navigation. Escape and backdrop clicks close it.',
      inputs: [
        { name: 'open', type: 'model<boolean>', default: 'false', description: 'Panel visibility' },
        { name: 'title', type: 'string', default: "''", description: 'Header text' },
        { name: 'side', type: "'left' | 'right'", default: "'right'", description: 'Which edge it slides from' },
        { name: 'width', type: 'string', default: "'380px'", description: 'CSS width' }
      ],
      outputs: [{ name: 'closed', type: 'void', description: 'Emitted when the drawer closes' }],
      usage: '<app-drawer title="Filters" [(open)]="filtersOpen"> ... </app-drawer>'
    },
    {
      name: 'PaginationComponent',
      selector: 'app-pagination',
      category: 'shared',
      description: 'Page controls with automatic ellipsis for long ranges. Page state is a model signal, so the same component drives a list, a table or a remote query.',
      inputs: [
        { name: 'page', type: 'model<number>', default: '1', description: '1-based current page' },
        { name: 'pageSize', type: 'number', default: '10', description: 'Items per page' },
        { name: 'total', type: 'number', default: '0', description: 'Total item count' },
        { name: 'siblings', type: 'number', default: '1', description: 'Page buttons rendered around the current page' }
      ],
      outputs: [{ name: 'pageChange', type: 'number', description: 'Emitted with the clamped new page' }],
      usage: '<app-pagination [(page)]="page" [pageSize]="10" [total]="total" />'
    },
    {
      name: 'BreadcrumbsComponent',
      selector: 'app-breadcrumbs',
      category: 'shared',
      description: "Trail built from each route's data.breadcrumb, so adding a route is enough to make it appear.",
      inputs: [
        { name: 'homeLabel', type: 'string', default: "'Home'", description: 'Label of the root crumb' },
        { name: 'homeUrl', type: 'string', default: "'/home'", description: 'Target of the root crumb' }
      ],
      outputs: [],
      usage: `// In app.routes.ts
{ path: 'settings', data: { breadcrumb: 'Settings' }, loadComponent: ... }

// In the navbar
<app-breadcrumbs />`
    },
    {
      name: 'AvatarComponent',
      selector: 'app-avatar',
      category: 'shared',
      description:
        'Image avatar with an initials fallback. The color is derived from the name, so the same person always gets the same avatar, and a broken src never leaves a broken image.',
      inputs: [
        { name: 'name', type: 'string', default: "''", description: 'Used for the initials and the generated color' },
        { name: 'src', type: 'string', default: "''", description: 'Optional image URL' },
        { name: 'size', type: "'sm' | 'md' | 'lg' | number", default: "'md'", description: 'Preset size or explicit pixels' },
        { name: 'status', type: "'online' | 'offline' | 'busy' | 'away' | null", default: 'null', description: 'Presence dot' },
        { name: 'square', type: 'boolean', default: 'false', description: 'Rounded square instead of a circle' }
      ],
      outputs: [],
      usage: '<app-avatar name="Ada Lovelace" size="lg" status="online" />'
    },
    {
      name: 'ChipComponent',
      selector: 'app-chip',
      category: 'shared',
      description: 'Compact label for tags, filters and multi-select values.',
      inputs: [
        { name: 'variant', type: 'UiVariant', default: "'secondary'", description: 'Color variant' },
        { name: 'size', type: 'UiSize', default: "'md'", description: 'Chip size' },
        { name: 'removable', type: 'boolean', default: 'false', description: 'Show a remove button' },
        { name: 'selected', type: 'boolean', default: 'false', description: 'Highlight as selected' }
      ],
      outputs: [{ name: 'removed', type: 'void', description: 'Emitted when the remove button is clicked' }],
      usage: '<app-chip variant="primary" [removable]="true" (removed)="remove(tag)">{{ tag }}</app-chip>'
    },
    {
      name: 'TimelineComponent',
      selector: 'app-timeline',
      category: 'shared',
      description: 'Vertical activity feed for audit logs, deployment history and order tracking.',
      inputs: [{ name: 'items', type: 'TimelineItem[]', default: '[]', description: 'Entries: title, description, timestamp, variant, icon (SVG path data)' }],
      outputs: [],
      usage: '<app-timeline [items]="activity" />'
    },
    {
      name: 'StepperComponent',
      selector: 'app-stepper',
      category: 'shared',
      description:
        'Multi-step flow with a progress header and next/back controls. In linear mode the Next button stays disabled until stepValid is true. The Wizard page is built on it.',
      inputs: [
        { name: 'activeIndex', type: 'model<number>', default: '0', description: 'Current step' },
        { name: 'orientation', type: "'horizontal' | 'vertical'", default: "'horizontal'", description: 'Header layout' },
        { name: 'linear', type: 'boolean', default: 'true', description: 'Forbid skipping ahead' },
        { name: 'nextLabel / backLabel / finishLabel', type: 'string', default: "'Next' / 'Back' / 'Finish'", description: 'Button labels' }
      ],
      outputs: [
        { name: 'completed', type: 'void', description: 'Emitted when the last step is confirmed' },
        { name: 'stepChange', type: 'number', description: 'Emitted on every step change' }
      ],
      usage: `<app-stepper (completed)="submit()">
  <ng-template appStep="Account" [stepValid]="form.email().valid()"> ... </ng-template>
  <ng-template appStep="Review"> ... </ng-template>
</app-stepper>`
    },
    {
      name: 'IconComponent',
      selector: 'app-icon',
      category: 'shared',
      description:
        "Renders an outline icon from its SVG path data. Icons are passed as path strings rather than markup because Angular's HTML sanitizer strips <svg> out of [innerHTML] bindings, which makes the icon silently disappear.",
      inputs: [
        { name: 'path', type: 'string | string[]', default: '(required)', description: 'One path, or several for multi-stroke icons' },
        { name: 'size', type: 'number', default: '20', description: 'Width and height in pixels' },
        { name: 'strokeWidth', type: 'number', default: '2', description: 'Stroke width' }
      ],
      outputs: [],
      usage: '<app-icon [path]="ICONS.users" [size]="20" />'
    },
    {
      name: 'Form controls',
      selector: 'app-ui-input / app-ui-select / app-ui-textarea / app-ui-checkbox / app-ui-switch / app-file-upload',
      category: 'shared',
      description:
        'Controls bound to Angular 21 Signal Forms. Each takes the FieldTree from form() and renders label, hint and error consistently, surfacing the error only after the field has been touched. app-ui-switch also works standalone with [(checked)] for settings that live in a service.',
      inputs: [
        { name: 'field', type: 'FieldTree<T>', default: '(required)', description: 'The form field to bind' },
        { name: 'label / hint / placeholder', type: 'string', default: "''", description: 'Chrome around the control' },
        { name: 'required', type: 'boolean', default: 'false', description: 'Drives the asterisk only; the real rule lives in the schema' }
      ],
      outputs: [],
      usage: `protected readonly model = signal({ email: '', role: '' });
protected readonly userForm = form(this.model, path => {
  required(path.email, { message: 'Email is required' });
  email(path.email, { message: 'Enter a valid email address' });
});

<app-ui-input label="Email" type="email" [required]="true" [field]="userForm.email" />
<app-ui-select label="Role" [options]="roles" [field]="userForm.role" />
<button [disabled]="userForm().invalid()">Save</button>`
    },
  ];

  readonly coreComponents: ComponentDoc[] = [
    {
      name: 'StatCardComponent',
      selector: 'app-stat-card',
      category: 'core',
      description: 'A statistics display card with icon, value, trend indicator, and accent color.',
      inputs: [
        { name: 'title', type: 'string', default: "'Statistic'", description: 'Card title label' },
        { name: 'value', type: 'string | number', default: "'0'", description: 'Primary display value' },
        { name: 'icon', type: 'string', default: "''", description: 'SVG icon string' },
        { name: 'trend', type: 'number', default: '0', description: 'Trend percentage (positive = up, negative = down)' },
        { name: 'accent', type: "'primary' | 'secondary' | 'success' | 'warning'", default: "'primary'", description: 'Accent color variant' }
      ],
      outputs: [],
      usage: '<app-stat-card title="Users" value="1,234" [trend]="12" accent="success"></app-stat-card>'
    },
    {
      name: 'SidebarComponent',
      selector: 'app-sidebar',
      category: 'core',
      description: 'The main navigation sidebar. This is a layout component with no public inputs or outputs. It uses SidebarService internally for collapse state management.',
      inputs: [],
      outputs: [],
      usage: '<app-sidebar></app-sidebar>'
    },
    {
      name: 'NavbarComponent',
      selector: 'app-navbar',
      category: 'core',
      description: 'The top navigation bar. This is a layout component with no public inputs or outputs. It integrates with AuthService and SidebarService.',
      inputs: [],
      outputs: [],
      usage: '<app-navbar></app-navbar>'
    }
  ];
}
