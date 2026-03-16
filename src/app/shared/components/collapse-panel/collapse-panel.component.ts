import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-collapse-panel',
  templateUrl: './collapse-panel.component.html',
  styleUrl: './collapse-panel.component.css'
})
export class CollapsePanelComponent {
  @Input() title = '';
  @Input() expanded = false;

  toggle(): void {
    this.expanded = !this.expanded;
  }
}
