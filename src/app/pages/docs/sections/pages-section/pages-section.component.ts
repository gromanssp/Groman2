import { Component, ChangeDetectionStrategy } from '@angular/core';

interface PageDoc {
  name: string;
  route: string;
  description: string;
  features: string[];
}

@Component({
  selector: 'app-pages-section',
  standalone: true,
  templateUrl: './pages-section.component.html',
  styleUrl: './pages-section.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PagesSectionComponent {
  readonly pages: PageDoc[] = [
    {
      name: 'Dashboard',
      route: '/home',
      description: 'Main overview with stat cards and charts',
      features: ['StatCard widgets with trend indicators', 'Chart.js line and bar charts', 'Responsive grid layout']
    },
    {
      name: 'Components Library',
      route: '/components',
      description: 'Interactive component showcase with 15 sections',
      features: ['Live demos of all shared components', 'Badges, modals, tables, spinners', 'Progress bars, date pickers, code snippets']
    },
    {
      name: 'Wizard Flow',
      route: '/wizard',
      description: 'Multi-step form wizard demo',
      features: ['Step-by-step form navigation', 'Progress indicator', 'Form validation per step']
    },
    {
      name: 'Calendar',
      route: '/calendar',
      description: 'Interactive calendar with event management',
      features: ['Month/week/day views', 'Event creation and editing', 'Date navigation']
    },
    {
      name: 'Charts',
      route: '/charts',
      description: 'Chart.js visualizations',
      features: ['Line chart', 'Bar chart', 'Doughnut chart', 'Radar chart', 'Polar area chart', 'Bubble chart']
    },
    {
      name: 'Profile',
      route: '/profile',
      description: 'User profile editing',
      features: ['Display name and avatar', 'Profile information form', 'Firebase Auth integration']
    },
    {
      name: 'Settings',
      route: '/settings',
      description: 'Theme color switching with 6 themes',
      features: ['Live theme preview', 'Indigo, blue, green, purple, red, teal', 'Persisted via localStorage']
    },
    {
      name: '404 Not Found',
      route: '/404',
      description: 'Error page for unmatched routes',
      features: ['Animated illustration', 'Navigation back to dashboard', 'Wildcard route catch']
    }
  ];
}
