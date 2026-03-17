import { Component, Input } from '@angular/core';

export interface TableColumn {
  key: string;
  label: string;
  width?: string;
}

@Component({
    selector: 'app-data-table',
    templateUrl: './data-table.component.html',
    styleUrl: './data-table.component.css'
})
export class DataTableComponent {
  @Input() columns: TableColumn[] = [];
  @Input() data: Record<string, unknown>[] = [];
  @Input() striped = false;
  @Input() hover = true;
  @Input() bordered = false;
}
