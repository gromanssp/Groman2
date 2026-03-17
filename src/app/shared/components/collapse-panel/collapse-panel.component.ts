import { Component, Input } from '@angular/core';
import { CollapseDirective } from '../../../directives/collapse.directive';

@Component({
    selector: 'app-collapse-panel',
    templateUrl: './collapse-panel.component.html',
    styleUrl: './collapse-panel.component.css',
    imports: [CollapseDirective]
})
export class CollapsePanelComponent {
  @Input() title = '';
  @Input() expanded = false;

  toggle(): void {
    this.expanded = !this.expanded;
  }
}
