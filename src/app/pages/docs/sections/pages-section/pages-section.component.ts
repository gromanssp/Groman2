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
      description: 'Overview with stat cards, charts, a recent-orders table and an activity feed',
      features: [
        'StatCard widgets with trend indicators and skeleton loading',
        'Chart.js line and bar charts whose colors follow the active accent theme',
        'DataTable with a custom status-badge cell template',
        'Timeline activity feed',
        'A toggle that previews every loading state at once'
      ]
    },
    {
      name: 'Components Library',
      route: '/components',
      description: 'Interactive showcase, one lazily-loaded chunk per section',
      features: [
        'Foundations: buttons, button groups, badges, chips, avatars, icons, grid',
        'Feedback: alerts, toasts, skeletons and empty states, spinners, progress',
        'Navigation: tabs, navs, dropdowns, drawer, pagination, modals, collapse',
        'Data: tables, cards, timeline, carousel',
        'Input: Signal Forms controls, stepper, date picker',
        'Behaviour: the directive kit and tooltips'
      ]
    },
    {
      name: 'Wizard Flow',
      route: '/wizard',
      description: 'Multi-step setup built on the shared StepperComponent',
      features: [
        'Per-step validation - Continue stays disabled until the step is valid',
        'Signal Forms model shared across all three steps',
        'Live summary computed from the form model',
        'Success toast on completion'
      ]
    },
    {
      name: 'Calendar',
      route: '/calendar',
      description: 'Month grid with event management',
      features: [
        'Six-week grid derived with computed() from cursor, selection and events',
        'Color-coded event dots and a details panel',
        'Create-event modal driven by Signal Forms',
        'Empty states for days with nothing scheduled'
      ]
    },
    {
      name: 'Charts',
      route: '/charts',
      description: 'Chart.js visualizations. Chart.js is provided at the route level, so it never enters the initial bundle',
      features: ['Line chart', 'Bar chart', 'Doughnut chart', 'Radar chart', 'Polar area chart', 'Bubble chart']
    },
    {
      name: 'Profile',
      route: '/profile',
      description: 'Account management, behind authGuard',
      features: [
        'Tabs for details, security and activity',
        'Signal Forms for the profile and password forms, including a cross-field match rule',
        'Avatar with generated initials',
        'Activity timeline'
      ]
    },
    {
      name: 'Settings',
      route: '/settings',
      description: 'Appearance controls, behind authGuard',
      features: [
        'Light/dark scheme switch',
        '12 accent themes: 6 colors x dark or colored navbar',
        'Live preview swatches',
        'Persisted through persistedSignal()'
      ]
    },
    {
      name: 'Documentation',
      route: '/docs',
      description: 'This hub - architecture, API reference and the template download',
      features: [
        'Overview, Components, Directives, Services, Pages, Security Audit',
        'Download: builds the starter ZIP in the browser from the mirrored manifest'
      ]
    },
    {
      name: 'Login / Register',
      route: '/auth/login, /auth/register',
      description: 'Auth pages rendered inside the dedicated auth layout, not the dashboard shell',
      features: [
        'Signal Forms validation with required, email and minLength rules',
        'Cross-field password confirmation on register',
        'Errors surface only after a field has been touched'
      ]
    },
    {
      name: '404 Not Found',
      route: '/**',
      description: 'Wildcard route for anything unmatched',
      features: ['Animated illustration', 'Link back to the dashboard']
    }
  ];
}
