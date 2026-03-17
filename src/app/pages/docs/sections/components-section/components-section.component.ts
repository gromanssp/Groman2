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
        { name: 'isOpen', type: 'boolean', default: 'false', description: 'Controls visibility of the modal' },
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
        { name: 'expanded', type: 'boolean', default: 'false', description: 'Whether the panel is initially expanded' }
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
        { name: 'columns', type: 'TableColumn[]', default: '[]', description: 'Column definitions array' },
        { name: 'data', type: 'Record<string, unknown>[]', default: '[]', description: 'Array of row data objects' },
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
      usage: '<app-date-picker mode="range" (rangeChange)="onRange($event)"></app-date-picker>'
    }
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
