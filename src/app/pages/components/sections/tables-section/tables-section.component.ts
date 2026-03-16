import { Component } from '@angular/core';
import { TableColumn } from '../../../../shared/components/data-table/data-table.component';

@Component({
  selector: 'app-tables-section',
  templateUrl: './tables-section.component.html',
  styleUrl: './tables-section.component.css'
})
export class TablesSectionComponent {
  striped = true;
  hover = true;
  bordered = false;

  codes = {
    default: `<app-data-table\n  [columns]="columns"\n  [data]="data">\n</app-data-table>`,
    striped: `<app-data-table\n  [columns]="columns" [data]="data"\n  [striped]="true">\n</app-data-table>`,
    bordered: `<app-data-table\n  [columns]="columns" [data]="data"\n  [bordered]="true">\n</app-data-table>`,
    interactive: `<app-data-table\n  [columns]="columns" [data]="data"\n  [striped]="striped" [hover]="hover"\n  [bordered]="bordered">\n</app-data-table>`
  };

  columns: TableColumn[] = [
    { key: 'id', label: '#', width: '60px' },
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role' },
    { key: 'status', label: 'Status' }
  ];

  data: Record<string, unknown>[] = [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'Editor', status: 'Active' },
    { id: 3, name: 'Carol White', email: 'carol@example.com', role: 'Viewer', status: 'Inactive' },
    { id: 4, name: 'David Brown', email: 'david@example.com', role: 'Editor', status: 'Active' },
    { id: 5, name: 'Eve Davis', email: 'eve@example.com', role: 'Admin', status: 'Pending' }
  ];
}
