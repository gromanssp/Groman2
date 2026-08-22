import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CellTemplateDirective } from '../../../../directives/cell-template.directive';
import { BadgeComponent } from '../../../../shared/components/badge/badge.component';
import { CodeSnippetComponent } from '../../../../shared/components/code-snippet/code-snippet.component';
import { DataTableComponent, TableColumn, TableRow } from '../../../../shared/components/data-table/data-table.component';
import { UiSwitchComponent } from '../../../../shared/components/ui-switch/ui-switch.component';

@Component({
  selector: 'app-tables-section',
  templateUrl: './tables-section.component.html',
  styleUrl: './tables-section.component.css',
  imports: [DataTableComponent, CodeSnippetComponent, BadgeComponent, CellTemplateDirective, UiSwitchComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TablesSectionComponent {
  protected readonly striped = signal(true);
  protected readonly hover = signal(true);
  protected readonly bordered = signal(false);
  protected readonly loading = signal(false);

  protected readonly codes = {
    default: `<app-data-table [columns]="columns" [rows]="rows" />`,
    sortable: `columns = [\n  { key: 'name', label: 'Name', sortable: true },\n  { key: 'role', label: 'Role', sortable: true }\n];\n\n<app-data-table\n  [columns]="columns"\n  [rows]="rows"\n  [searchable]="true"\n  [pageSize]="5" />`,
    template: `<app-data-table [columns]="columns" [rows]="rows">\n  <ng-template appCellTemplate="status" let-value>\n    <app-badge [variant]="value === 'Active' ? 'success' : 'secondary'">\n      {{ value }}\n    </app-badge>\n  </ng-template>\n</app-data-table>`,
    states: `<!-- Loading skeleton rows -->\n<app-data-table [columns]="columns" [rows]="[]" [loading]="true" [pageSize]="5" />\n\n<!-- Empty state -->\n<app-data-table [columns]="columns" [rows]="[]" emptyMessage="No users yet" />`
  };

  protected readonly columns: TableColumn[] = [
    { key: 'id', label: '#', width: '60px', sortable: true },
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role', sortable: true },
    { key: 'status', label: 'Status', align: 'center' }
  ];

  protected readonly rows: TableRow[] = [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'Editor', status: 'Active' },
    { id: 3, name: 'Carol White', email: 'carol@example.com', role: 'Viewer', status: 'Inactive' },
    { id: 4, name: 'David Brown', email: 'david@example.com', role: 'Editor', status: 'Active' },
    { id: 5, name: 'Eve Davis', email: 'eve@example.com', role: 'Admin', status: 'Pending' },
    { id: 6, name: 'Frank Miller', email: 'frank@example.com', role: 'Viewer', status: 'Active' },
    { id: 7, name: 'Grace Lee', email: 'grace@example.com', role: 'Editor', status: 'Pending' },
    { id: 8, name: 'Henry Ford', email: 'henry@example.com', role: 'Viewer', status: 'Inactive' }
  ];

  protected readonly emptyRows: TableRow[] = [];

  protected statusVariant(status: unknown): 'success' | 'warning' | 'secondary' {
    if (status === 'Active') return 'success';
    if (status === 'Pending') return 'warning';
    return 'secondary';
  }
}
