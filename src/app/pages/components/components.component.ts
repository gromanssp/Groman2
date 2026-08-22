import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

interface NavGroup {
  title: string;
  items: { path: string; label: string }[];
}

@Component({
  selector: 'app-components',
  templateUrl: './components.component.html',
  styleUrl: './components.component.css',
  imports: [RouterLinkActive, RouterLink, RouterOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentsPageComponent {
  protected readonly navGroups: readonly NavGroup[] = [
    {
      title: 'Foundations',
      items: [
        { path: 'buttons', label: 'Buttons' },
        { path: 'button-groups', label: 'Button Groups' },
        { path: 'badges', label: 'Badges' },
        { path: 'chips', label: 'Chips' },
        { path: 'avatars', label: 'Avatars' },
        { path: 'icons', label: 'Icons' },
        { path: 'grid', label: 'Grid System' }
      ]
    },
    {
      title: 'Feedback',
      items: [
        { path: 'alerts', label: 'Alerts' },
        { path: 'toasts', label: 'Toasts' },
        { path: 'skeletons', label: 'Skeletons & Empty' },
        { path: 'spinners', label: 'Spinners' },
        { path: 'progress', label: 'Progress' }
      ]
    },
    {
      title: 'Navigation',
      items: [
        { path: 'tabs', label: 'Tabs' },
        { path: 'navs', label: 'Navs' },
        { path: 'dropdowns', label: 'Dropdowns' },
        { path: 'drawer', label: 'Drawer' },
        { path: 'pagination', label: 'Pagination' },
        { path: 'modals', label: 'Modals' },
        { path: 'collapse', label: 'Collapse' }
      ]
    },
    {
      title: 'Data',
      items: [
        { path: 'tables', label: 'Tables' },
        { path: 'cards', label: 'Cards' },
        { path: 'timeline', label: 'Timeline' },
        { path: 'carousel', label: 'Carousel' }
      ]
    },
    {
      title: 'Input',
      items: [
        { path: 'forms', label: 'Forms' },
        { path: 'stepper', label: 'Stepper' },
        { path: 'datepicker', label: 'Date Picker' }
      ]
    },
    {
      title: 'Behaviour',
      items: [
        { path: 'directives', label: 'Directives' },
        { path: 'tooltips', label: 'Tooltips' }
      ]
    }
  ];
}
