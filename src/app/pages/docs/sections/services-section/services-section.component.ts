import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CodeSnippetComponent } from '../../../../shared/components/code-snippet/code-snippet.component';

interface ServiceMethod {
  name: string;
  signature: string;
  description: string;
}

interface ServiceObservable {
  name: string;
  type: string;
  description: string;
}

interface ServiceProperty {
  name: string;
  type: string;
  description: string;
}

interface ServiceDoc {
  name: string;
  providedIn: string;
  description: string;
  observables: ServiceObservable[];
  methods: ServiceMethod[];
  properties: ServiceProperty[];
  extras: string;
  usage: string;
}

@Component({
  selector: 'app-services-section',
  standalone: true,
  templateUrl: './services-section.component.html',
  styleUrl: './services-section.component.css',
  imports: [CodeSnippetComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServicesSectionComponent {
  readonly services: ServiceDoc[] = [
    {
      name: 'AuthService',
      providedIn: 'root',
      description: 'Handles user authentication via Firebase Auth including email/password and Google sign-in. Manages user state and profile data.',
      observables: [
        { name: 'user$', type: 'Observable<User | null>', description: 'Emits the current Firebase user or null when signed out' },
        { name: 'profile$', type: 'Observable<UserProfile | null>', description: 'Emits the user profile from Firestore or null' }
      ],
      methods: [
        { name: 'register', signature: 'register(email: string, password: string, displayName: string): Promise<User>', description: 'Creates a new user account with email and password' },
        { name: 'login', signature: 'login(email: string, password: string): Promise<User>', description: 'Signs in with email and password credentials' },
        { name: 'loginWithGoogle', signature: 'loginWithGoogle(): Promise<User>', description: 'Initiates Google OAuth sign-in flow' },
        { name: 'logout', signature: 'logout(): Promise<void>', description: 'Signs out the current user' },
        { name: 'getUserProfile', signature: 'getUserProfile(uid: string): Promise<UserProfile | null>', description: 'Fetches user profile data from Firestore by UID' }
      ],
      properties: [
        { name: 'currentUser', type: 'User | null', description: 'Synchronous access to the current Firebase user' },
        { name: 'isAuthenticated', type: 'boolean', description: 'Whether a user is currently signed in' }
      ],
      extras: '',
      usage: `import { inject } from '@angular/core';
import { AuthService } from './services/auth.service';

private authService = inject(AuthService);

// Subscribe to auth state
this.authService.user$.subscribe(user => {
  console.log('User:', user?.displayName);
});

// Login
await this.authService.login('user@example.com', 'password');`
    },
    {
      name: 'SidebarService',
      providedIn: 'root',
      description: 'Manages sidebar collapse state for both desktop and mobile views. Used by SidebarComponent and NavbarComponent.',
      observables: [
        { name: 'collapsed$', type: 'Observable<boolean>', description: 'Emits whether the sidebar is collapsed on desktop' },
        { name: 'mobileOpen$', type: 'Observable<boolean>', description: 'Emits whether the sidebar is open on mobile' }
      ],
      methods: [
        { name: 'toggle', signature: 'toggle(): void', description: 'Toggles the sidebar collapse state' },
        { name: 'collapse', signature: 'collapse(): void', description: 'Collapses the sidebar' },
        { name: 'expand', signature: 'expand(): void', description: 'Expands the sidebar' },
        { name: 'toggleMobile', signature: 'toggleMobile(): void', description: 'Toggles the mobile sidebar' },
        { name: 'openMobile', signature: 'openMobile(): void', description: 'Opens the mobile sidebar' },
        { name: 'closeMobile', signature: 'closeMobile(): void', description: 'Closes the mobile sidebar' }
      ],
      properties: [
        { name: 'isCollapsed', type: 'boolean', description: 'Current collapse state (synchronous)' }
      ],
      extras: '',
      usage: `private sidebarService = inject(SidebarService);

// Toggle sidebar
this.sidebarService.toggle();

// React to state changes
this.sidebarService.collapsed$.subscribe(collapsed => {
  console.log('Collapsed:', collapsed);
});`
    },
    {
      name: 'PaymentService',
      providedIn: 'root',
      description: 'Handles donation payments including creation, completion tracking, and history retrieval via Firestore.',
      observables: [],
      methods: [
        { name: 'createDonation', signature: 'createDonation(amount: number, message?: string): Promise<string>', description: 'Creates a new donation record and returns the donation ID' },
        { name: 'completeDonation', signature: 'completeDonation(donationId: string): Promise<void>', description: 'Marks a donation as completed' },
        { name: 'getUserDonations', signature: 'getUserDonations(): Promise<Donation[]>', description: 'Retrieves all donations for the current user' },
        { name: 'getTotalDonations', signature: 'getTotalDonations(): Promise<number>', description: 'Returns the total amount of all donations' }
      ],
      properties: [],
      extras: '',
      usage: `private paymentService = inject(PaymentService);

// Create a donation
const donationId = await this.paymentService.createDonation(10, 'Great project!');

// Complete the donation
await this.paymentService.completeDonation(donationId);

// Get donation history
const donations = await this.paymentService.getUserDonations();`
    },
    {
      name: 'ThemeService',
      providedIn: 'root',
      description: 'Manages the application color theme. Persists the selected theme to localStorage and applies it by loading the corresponding CSS file.',
      observables: [],
      methods: [
        { name: 'applyTheme', signature: 'applyTheme(key: string): void', description: 'Applies a theme by key and persists the selection' },
        { name: 'getTheme', signature: 'getTheme(): string', description: 'Returns the current theme key' }
      ],
      properties: [],
      extras: 'Available themes: indigo, blue, green, purple, red, teal. Storage key: groman-theme (localStorage).',
      usage: `private themeService = inject(ThemeService);

// Apply a theme
this.themeService.applyTheme('purple');

// Get current theme
const current = this.themeService.getTheme(); // 'purple'`
    },
    {
      name: 'authGuard',
      providedIn: 'CanActivateFn',
      description: 'A functional route guard that checks if the user is authenticated. Redirects unauthenticated users to /auth/login.',
      observables: [],
      methods: [
        { name: 'authGuard', signature: 'authGuard(): Observable<boolean>', description: 'Returns true if user is authenticated, otherwise redirects to login' }
      ],
      properties: [],
      extras: '',
      usage: `import { authGuard } from './services/auth.guard';

// In route configuration
{
  path: 'dashboard',
  component: DashboardComponent,
  canActivate: [authGuard]
}`
    }
  ];
}
