import { Routes } from '@angular/router';

/** Every demo section is its own chunk, loaded when its tab is opened. */
export const COMPONENTS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./components.component').then(m => m.ComponentsPageComponent),
    children: [
      { path: '', redirectTo: 'buttons', pathMatch: 'full' },
      {
        path: 'buttons',
        title: 'Buttons · Groman2',
        data: { breadcrumb: 'Buttons' },
        loadComponent: () =>
          import('./sections/buttons-section/buttons-section.component').then(m => m.ButtonsSectionComponent)
      },
      {
        path: 'button-groups',
        title: 'Button groups · Groman2',
        data: { breadcrumb: 'Button groups' },
        loadComponent: () =>
          import('./sections/button-groups-section/button-groups-section.component').then(m => m.ButtonGroupsSectionComponent)
      },
      {
        path: 'badges',
        title: 'Badges · Groman2',
        data: { breadcrumb: 'Badges' },
        loadComponent: () =>
          import('./sections/badges-section/badges-section.component').then(m => m.BadgesSectionComponent)
      },
      {
        path: 'cards',
        title: 'Cards · Groman2',
        data: { breadcrumb: 'Cards' },
        loadComponent: () =>
          import('./sections/cards-section/cards-section.component').then(m => m.CardsSectionComponent)
      },
      {
        path: 'carousel',
        title: 'Carousel · Groman2',
        data: { breadcrumb: 'Carousel' },
        loadComponent: () =>
          import('./sections/carousel-section/carousel-section.component').then(m => m.CarouselSectionComponent)
      },
      {
        path: 'collapse',
        title: 'Collapse · Groman2',
        data: { breadcrumb: 'Collapse' },
        loadComponent: () =>
          import('./sections/collapse-section/collapse-section.component').then(m => m.CollapseSectionComponent)
      },
      {
        path: 'forms',
        title: 'Forms · Groman2',
        data: { breadcrumb: 'Forms' },
        loadComponent: () =>
          import('./sections/forms-section/forms-section.component').then(m => m.FormsSectionComponent)
      },
      {
        path: 'modals',
        title: 'Modals · Groman2',
        data: { breadcrumb: 'Modals' },
        loadComponent: () =>
          import('./sections/modals-section/modals-section.component').then(m => m.ModalsSectionComponent)
      },
      {
        path: 'navs',
        title: 'Navs · Groman2',
        data: { breadcrumb: 'Navs' },
        loadComponent: () =>
          import('./sections/navs-section/navs-section.component').then(m => m.NavsSectionComponent)
      },
      {
        path: 'progress',
        title: 'Progress · Groman2',
        data: { breadcrumb: 'Progress' },
        loadComponent: () =>
          import('./sections/progress-section/progress-section.component').then(m => m.ProgressSectionComponent)
      },
      {
        path: 'tables',
        title: 'Tables · Groman2',
        data: { breadcrumb: 'Tables' },
        loadComponent: () =>
          import('./sections/tables-section/tables-section.component').then(m => m.TablesSectionComponent)
      },
      {
        path: 'tooltips',
        title: 'Tooltips · Groman2',
        data: { breadcrumb: 'Tooltips' },
        loadComponent: () =>
          import('./sections/tooltips-section/tooltips-section.component').then(m => m.TooltipsSectionComponent)
      },
      {
        path: 'datepicker',
        title: 'Date picker · Groman2',
        data: { breadcrumb: 'Date picker' },
        loadComponent: () =>
          import('./sections/datepicker-section/datepicker-section.component').then(m => m.DatepickerSectionComponent)
      },
      {
        path: 'grid',
        title: 'Grid · Groman2',
        data: { breadcrumb: 'Grid' },
        loadComponent: () =>
          import('./sections/grid-section/grid-section.component').then(m => m.GridSectionComponent)
      },
      {
        path: 'icons',
        title: 'Icons · Groman2',
        data: { breadcrumb: 'Icons' },
        loadComponent: () =>
          import('./sections/icons-section/icons-section.component').then(m => m.IconsSectionComponent)
      },
      {
        path: 'spinners',
        title: 'Spinners · Groman2',
        data: { breadcrumb: 'Spinners' },
        loadComponent: () =>
          import('./sections/spinner-section/spinner-section.component').then(m => m.SpinnerSectionComponent)
      },
      {
        path: 'alerts',
        title: 'Alerts · Groman2',
        data: { breadcrumb: 'Alerts' },
        loadComponent: () =>
          import('./sections/alerts-section/alerts-section.component').then(m => m.AlertsSectionComponent)
      },
      {
        path: 'toasts',
        title: 'Toasts · Groman2',
        data: { breadcrumb: 'Toasts' },
        loadComponent: () =>
          import('./sections/toasts-section/toasts-section.component').then(m => m.ToastsSectionComponent)
      },
      {
        path: 'skeletons',
        title: 'Skeletons · Groman2',
        data: { breadcrumb: 'Skeletons' },
        loadComponent: () =>
          import('./sections/skeletons-section/skeletons-section.component').then(m => m.SkeletonsSectionComponent)
      },
      {
        path: 'tabs',
        title: 'Tabs · Groman2',
        data: { breadcrumb: 'Tabs' },
        loadComponent: () =>
          import('./sections/tabs-section/tabs-section.component').then(m => m.TabsSectionComponent)
      },
      {
        path: 'dropdowns',
        title: 'Dropdowns · Groman2',
        data: { breadcrumb: 'Dropdowns' },
        loadComponent: () =>
          import('./sections/dropdowns-section/dropdowns-section.component').then(m => m.DropdownsSectionComponent)
      },
      {
        path: 'drawer',
        title: 'Drawer · Groman2',
        data: { breadcrumb: 'Drawer' },
        loadComponent: () =>
          import('./sections/drawer-section/drawer-section.component').then(m => m.DrawerSectionComponent)
      },
      {
        path: 'pagination',
        title: 'Pagination · Groman2',
        data: { breadcrumb: 'Pagination' },
        loadComponent: () =>
          import('./sections/pagination-section/pagination-section.component').then(m => m.PaginationSectionComponent)
      },
      {
        path: 'avatars',
        title: 'Avatars · Groman2',
        data: { breadcrumb: 'Avatars' },
        loadComponent: () =>
          import('./sections/avatars-section/avatars-section.component').then(m => m.AvatarsSectionComponent)
      },
      {
        path: 'chips',
        title: 'Chips · Groman2',
        data: { breadcrumb: 'Chips' },
        loadComponent: () =>
          import('./sections/chips-section/chips-section.component').then(m => m.ChipsSectionComponent)
      },
      {
        path: 'timeline',
        title: 'Timeline · Groman2',
        data: { breadcrumb: 'Timeline' },
        loadComponent: () =>
          import('./sections/timeline-section/timeline-section.component').then(m => m.TimelineSectionComponent)
      },
      {
        path: 'stepper',
        title: 'Stepper · Groman2',
        data: { breadcrumb: 'Stepper' },
        loadComponent: () =>
          import('./sections/stepper-section/stepper-section.component').then(m => m.StepperSectionComponent)
      },
      {
        path: 'directives',
        title: 'Directives · Groman2',
        data: { breadcrumb: 'Directives' },
        loadComponent: () =>
          import('./sections/directives-showcase-section/directives-showcase-section.component').then(m => m.DirectivesShowcaseSectionComponent)
      }
    ]
  }
];
