import { Routes } from '@angular/router';
import { DashboardComponent } from './layouts/dashboard/dashboard.component';
import { AuthComponent } from './layouts/auth/auth.component';
import { HomeComponent } from './pages/home/home.component';
import { WizardComponent } from './pages/wizard/wizard.component';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { ChartsComponent } from './pages/charts/charts.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      {
        path: 'components',
        loadChildren: () => import('./pages/components/components.routes').then(m => m.COMPONENTS_ROUTES)
      },
      { path: 'wizard', component: WizardComponent },
      { path: 'calendar', component: CalendarComponent },
      { path: 'charts', component: ChartsComponent },
      {
        path: 'profile',
        loadComponent: () => import('./pages/profile/profile.component').then(m => m.ProfileComponent)
      },
      {
        path: 'settings',
        loadComponent: () => import('./pages/settings/settings.component').then(m => m.SettingsComponent)
      },
      {
        path: 'docs',
        loadChildren: () => import('./pages/docs/docs.routes').then(m => m.DOCS_ROUTES)
      },
      { path: 'buttons', redirectTo: 'components/buttons', pathMatch: 'full' }
    ]
  },
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent }
    ]
  },
  { path: '404', component: NotFoundComponent },
  { path: '**', component: NotFoundComponent }
];
