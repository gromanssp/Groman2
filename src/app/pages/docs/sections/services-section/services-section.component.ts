import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CodeSnippetComponent } from '../../../../shared/components/code-snippet/code-snippet.component';

interface ServiceMethod {
  name: string;
  signature: string;
  description: string;
}

interface ServiceSignal {
  name: string;
  type: string;
  description: string;
}

interface ServiceDoc {
  name: string;
  providedIn: string;
  description: string;
  /** Reactive surface - signals and computed values, not observables. */
  signals: ServiceSignal[];
  methods: ServiceMethod[];
  extras: string;
  usage: string;
}

@Component({
  selector: 'app-services-section',
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
      description:
        'Demo authentication backed by localStorage. The whole surface is signals, so components read it directly in templates with no subscription and no async pipe. To go to a real backend, replace the three async methods with HTTP calls and leave everything else untouched.',
      signals: [
        { name: 'user / profile', type: 'Signal<UserProfile | null>', description: 'The signed-in user, or null' },
        { name: 'isAuthenticated', type: 'Signal<boolean>', description: 'computed() - whether anyone is signed in' },
        { name: 'role', type: 'Signal<UserRole | null>', description: "computed() - drives the appPermission directive" },
        { name: 'initials', type: 'Signal<string>', description: 'computed() - up to two uppercase initials for the avatar' }
      ],
      methods: [
        { name: 'register', signature: 'register(email: string, password: string, displayName: string): Promise<void>', description: 'Creates an account and signs in' },
        { name: 'login', signature: 'login(email: string, password: string): Promise<void>', description: 'Signs in with email and password' },
        { name: 'loginWithGoogle', signature: 'loginWithGoogle(): Promise<void>', description: 'Placeholder for an OAuth flow' },
        { name: 'logout', signature: 'logout(): void', description: 'Clears the session and the stored profile' }
      ],
      extras: 'Storage key: groman-user. Guarded routes use authGuard, which reads isAuthenticated().',
      usage: `private readonly auth = inject(AuthService);

protected readonly user = this.auth.profile;

// In the template - no subscribe, no async pipe
@if (auth.isAuthenticated()) {
  <span>{{ user()?.displayName }}</span>
}`
    },
    {
      name: 'SidebarService',
      providedIn: 'root',
      description:
        'Sidebar state for desktop collapse and the mobile drawer. The desktop collapse is a persistedSignal, so it survives reloads; the mobile drawer always starts closed.',
      signals: [
        { name: 'collapsed', type: 'Signal<boolean>', description: 'Desktop collapse state (persisted)' },
        { name: 'mobileOpen', type: 'Signal<boolean>', description: 'Mobile drawer state' }
      ],
      methods: [
        { name: 'toggle', signature: 'toggle(): void', description: 'Flips the desktop collapse' },
        { name: 'collapse / expand', signature: 'collapse(): void / expand(): void', description: 'Sets the collapse state explicitly' },
        { name: 'toggleMobile', signature: 'toggleMobile(): void', description: 'Flips the mobile drawer' },
        { name: 'openMobile / closeMobile', signature: 'openMobile(): void / closeMobile(): void', description: 'Sets the drawer state explicitly' }
      ],
      extras: 'Storage key: groman-sidebar-collapsed.',
      usage: `private readonly sidebar = inject(SidebarService);
protected readonly collapsed = this.sidebar.collapsed;

<aside [class.collapsed]="collapsed()"> ... </aside>`
    },
    {
      name: 'ThemeService',
      providedIn: 'root',
      description:
        'Owns both the accent theme and the dark/light color scheme. An effect writes CSS custom properties onto <html> whenever either changes, so no component has to know about theming at all.',
      signals: [
        { name: 'themeKey', type: 'Signal<string>', description: 'Active accent theme key (persisted)' },
        { name: 'activeTheme', type: 'Signal<ThemeConfig>', description: 'computed() - the full config for the active key' },
        { name: 'colorScheme', type: "Signal<'dark' | 'light'>", description: 'Active color scheme (persisted)' },
        { name: 'isLight', type: 'Signal<boolean>', description: 'computed() - convenience flag for the navbar toggle' }
      ],
      methods: [
        { name: 'setTheme', signature: 'setTheme(key: string): void', description: 'Switches accent theme; unknown keys are ignored' },
        { name: 'setColorScheme', signature: "setColorScheme(scheme: 'dark' | 'light'): void", description: 'Switches the color scheme' },
        { name: 'toggleColorScheme', signature: 'toggleColorScheme(): void', description: 'Flips between dark and light' }
      ],
      extras:
        'Twelve themes: indigo, blue, green, purple, red and teal, each with a dark and a colored navbar variant. Storage keys: groman-theme, groman-color-scheme. The light scheme works by flipping a single token, --overlay-rgb, which every surface and border in the app is built on.',
      usage: `private readonly theme = inject(ThemeService);

this.theme.setTheme('purple');
this.theme.toggleColorScheme();

// Charts and anything else can react to the accent
protected readonly chartData = computed(() => ({
  datasets: [{ borderColor: this.theme.activeTheme().primary, data: [...] }]
}));`
    },
    {
      name: 'ToastService',
      providedIn: 'root',
      description:
        'Notification queue held in a signal and rendered by <app-toast-host />, which is mounted once in the dashboard layout. Auto-dismiss timers are tracked per toast and cleaned up on dismiss.',
      signals: [{ name: 'toasts', type: 'Signal<Toast[]>', description: 'The current queue, oldest first' }],
      methods: [
        { name: 'success / error / warning / info', signature: "success(title: string, options?: { message?: string; duration?: number }): string", description: 'Queues a toast and returns its id' },
        { name: 'show', signature: 'show(variant: ToastVariant, title: string, options?): string', description: 'Generic form of the four helpers' },
        { name: 'dismiss', signature: 'dismiss(id: string): void', description: 'Removes one toast and clears its timer' },
        { name: 'clear', signature: 'clear(): void', description: 'Removes everything' }
      ],
      extras: 'Default duration is 4000 ms; pass duration: 0 for a toast that stays until dismissed.',
      usage: `private readonly toasts = inject(ToastService);

this.toasts.success('Profile saved', { message: 'Your changes are live.' });
this.toasts.error('Upload failed', { message: 'The file was larger than 5 MB.' });
this.toasts.info('Sync in progress', { duration: 0 }); // sticky`
    },
    {
      name: 'BreakpointService',
      providedIn: 'root',
      description:
        'Viewport queries as signals. Under zoneless change detection, reading window.innerWidth in a template never re-renders anything - this service is the fix. Repeated queries share a single matchMedia listener.',
      signals: [
        { name: 'isMobile', type: 'Signal<boolean>', description: 'Below the md breakpoint (768px), where the sidebar becomes a drawer' },
        { name: 'isTablet / isDesktop', type: 'Signal<boolean>', description: 'Below / above the lg breakpoint (992px)' }
      ],
      methods: [
        { name: 'matches', signature: 'matches(query: string): Signal<boolean>', description: 'Any media query as a signal' },
        { name: 'up / down', signature: "up(bp: Breakpoint): Signal<boolean> / down(bp): Signal<boolean>", description: 'Min-width / max-width helpers for sm, md, lg, xl' }
      ],
      extras: 'Breakpoints: sm 576, md 768, lg 992, xl 1200.',
      usage: `private readonly breakpoint = inject(BreakpointService);

protected toggleSidebar(): void {
  this.breakpoint.isMobile() ? this.sidebar.toggleMobile() : this.sidebar.toggle();
}`
    },
    {
      name: 'persistedSignal()',
      providedIn: 'services/storage.ts',
      description:
        'A writable signal mirrored into localStorage: it reads the stored value once on creation and writes it back on every change. It replaces the hand-rolled read/write calls that used to be scattered across four services.',
      signals: [],
      methods: [
        { name: 'persistedSignal', signature: 'persistedSignal<T>(key: string, initial: T): WritableSignal<T>', description: 'Signal backed by localStorage' },
        { name: 'readStorage / writeStorage / removeStorage', signature: 'readStorage<T>(key, fallback): T', description: 'Safe one-off helpers that swallow quota and private-mode errors' }
      ],
      extras: 'Must be created in an injection context, because it registers an effect().',
      usage: `@Injectable({ providedIn: 'root' })
export class SidebarService {
  private readonly _collapsed = persistedSignal('groman-sidebar-collapsed', false);
  readonly collapsed = this._collapsed.asReadonly();
}`
    },
    {
      name: 'PaymentService',
      providedIn: 'root',
      description: 'Demo donation flow persisted to localStorage, used by the donation button component.',
      signals: [],
      methods: [
        { name: 'createDonation', signature: 'createDonation(amount: number, message?: string): Promise<string>', description: 'Creates a pending donation and returns its id' },
        { name: 'completeDonation', signature: 'completeDonation(donationId: string): Promise<void>', description: 'Marks a donation completed' },
        { name: 'getUserDonations', signature: 'getUserDonations(): Promise<Donation[]>', description: "Donations for the signed-in user" },
        { name: 'getTotalDonations', signature: 'getTotalDonations(): Promise<number>', description: 'Sum of completed donations' }
      ],
      extras: 'Storage key: groman-donations.',
      usage: `const id = await this.payments.createDonation(10, 'Great project!');
await this.payments.completeDonation(id);`
    },
    {
      name: 'TemplateGeneratorService',
      providedIn: 'root',
      description:
        'Builds the downloadable starter ZIP in the browser. It reads template/manifest.json, fetches each listed file and zips it with JSZip (loaded on demand). It contains no copies of source code - the files are mirrored from src/ by scripts/sync-template.mjs, and pnpm run build fails if the two ever diverge.',
      signals: [
        { name: 'processed', type: 'Signal<number>', description: 'Files zipped so far, for the progress bar' },
        { name: 'totalFiles', type: 'Signal<number>', description: 'Total files in the manifest' }
      ],
      methods: [
        { name: 'loadManifest', signature: 'loadManifest(): Promise<TemplateManifest>', description: 'Fetches and caches the manifest' },
        { name: 'generateTemplate', signature: 'generateTemplate(): Promise<void>', description: 'Builds the ZIP and triggers the download' }
      ],
      extras: 'Run pnpm run template:sync after changing anything under src/ that ships in the template.',
      usage: `private readonly generator = inject(TemplateGeneratorService);

await this.generator.generateTemplate();`
    },
    {
      name: 'authGuard',
      providedIn: 'CanActivateFn',
      description: 'Functional route guard that redirects unauthenticated visitors to /auth/login. Applied to the profile and settings routes.',
      signals: [],
      methods: [
        { name: 'authGuard', signature: 'authGuard(): boolean', description: 'Returns true when AuthService.isAuthenticated() is true' }
      ],
      extras: 'Pair it with the appPermission directive for role-level UI, and enforce the same rules on your API.',
      usage: `{
  path: 'settings',
  canActivate: [authGuard],
  loadComponent: () => import('./pages/settings/settings.component').then(m => m.SettingsComponent)
}`
    }
  ];
}
