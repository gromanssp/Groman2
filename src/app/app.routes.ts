import { Routes } from '@angular/router';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { authGuard } from './services/auth.guard';

/** Chart.js only loads with the routes that actually draw charts. */
const CHART_PROVIDERS = [provideCharts(withDefaultRegisterables())];

/**
 * Every route is lazy, including both layouts, so the initial bundle only
 * carries the app shell and the router.
 *
 * `data.breadcrumb` feeds `<app-breadcrumbs>`; `title` feeds the document title.
 */
export const routes: Routes = [
  {
    path: 'auth',
    loadComponent: () => import('./layouts/auth/auth.component').then(m => m.AuthComponent),
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      {
        path: 'login',
        title: 'Sign in · Groman2',
        loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent)
      },
      {
        path: 'register',
        title: 'Create account · Groman2',
        loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent)
      }
    ]
  },
  {
    path: '',
    loadComponent: () => import('./layouts/dashboard/dashboard.component').then(m => m.DashboardComponent),
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        title: 'Dashboard · Groman2',
        providers: CHART_PROVIDERS,
        loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
      },
      {
        path: 'components',
        data: { breadcrumb: 'Components' },
        loadChildren: () => import('./pages/components/components.routes').then(m => m.COMPONENTS_ROUTES)
      },
      {
        path: 'wizard',
        title: 'Wizard · Groman2',
        data: { breadcrumb: 'Wizard' },
        loadComponent: () => import('./pages/wizard/wizard.component').then(m => m.WizardComponent)
      },
      {
        path: 'calendar',
        title: 'Calendar · Groman2',
        data: { breadcrumb: 'Calendar' },
        loadComponent: () => import('./pages/calendar/calendar.component').then(m => m.CalendarComponent)
      },
      {
        path: 'charts',
        title: 'Charts · Groman2',
        data: { breadcrumb: 'Charts' },
        providers: CHART_PROVIDERS,
        loadComponent: () => import('./pages/charts/charts.component').then(m => m.ChartsComponent)
      },
      {
        path: 'profile',
        title: 'Profile · Groman2',
        data: { breadcrumb: 'Profile' },
        canActivate: [authGuard],
        loadComponent: () => import('./pages/profile/profile.component').then(m => m.ProfileComponent)
      },
      {
        path: 'settings',
        title: 'Settings · Groman2',
        data: { breadcrumb: 'Settings' },
        canActivate: [authGuard],
        loadComponent: () => import('./pages/settings/settings.component').then(m => m.SettingsComponent)
      },
      {
        path: 'docs',
        data: { breadcrumb: 'Docs' },
        loadChildren: () => import('./pages/docs/docs.routes').then(m => m.DOCS_ROUTES)
      },
      { path: 'buttons', redirectTo: 'components/buttons', pathMatch: 'full' }
    ]
  },
  {
    path: '**',
    title: 'Not found · Groman2',
    loadComponent: () => import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent)
  }
];
