import { Component } from '@angular/core';

@Component({
  selector: 'app-components',
  templateUrl: './components.component.html',
  styleUrl: './components.component.css'
})
export class ComponentsPageComponent {
  navItems = [
    { path: 'buttons', label: 'Buttons' },
    { path: 'button-groups', label: 'Button Groups' },
    { path: 'badges', label: 'Badges' },
    { path: 'cards', label: 'Cards' },
    { path: 'collapse', label: 'Collapse' },
    { path: 'forms', label: 'Forms' },
    { path: 'modals', label: 'Modals' },
    { path: 'navs', label: 'Navs' },
    { path: 'progress', label: 'Progress' },
    { path: 'tables', label: 'Tables' },
    { path: 'tooltips', label: 'Tooltips' },
    { path: 'datepicker', label: 'Date Picker' },
    { path: 'grid', label: 'Grid System' },
    { path: 'icons', label: 'Icons' },
    { path: 'spinners', label: 'Spinners' }
  ];
}
