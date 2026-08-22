import { Component, ChangeDetectionStrategy } from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import { BadgeComponent } from '../../../../shared/components/badge/badge.component';

interface SecurityFinding {
  severity: 'critical' | 'medium' | 'low';
  title: string;
  files: string[];
  description: string;
  recommendation: string;
}

interface PositiveFinding {
  title: string;
  description: string;
}

@Component({
  selector: 'app-security-section',
  standalone: true,
  templateUrl: './security-section.component.html',
  styleUrl: './security-section.component.css',
  imports: [BadgeComponent, UpperCasePipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SecuritySectionComponent {
  readonly criticalCount = 0;
  readonly mediumCount = 1;
  readonly lowCount = 3;

  readonly findings: SecurityFinding[] = [
    {
      severity: 'medium',
      title: 'Demo authentication is not real authentication',
      files: ['auth.service.ts', 'auth.guard.ts'],
      description:
        'AuthService stores the session in localStorage and accepts any credentials. authGuard and the appPermission directive only hide UI - anyone can set the storage key by hand.',
      recommendation:
        'Replace the three async methods with real HTTP calls, keep the session in an httpOnly cookie, and enforce every role check on the server. The signal surface stays the same, so no component has to change.'
    },
    {
      severity: 'low',
      title: 'innerHTML on the icon gallery',
      files: ['icons-section.component.ts'],
      description:
        'The icons showcase renders SVG markup through bypassSecurityTrustHtml, because Angular\'s sanitizer strips <svg> from [innerHTML]. Every string is a hardcoded constant in that file, so there is no untrusted input - but the escape hatch is real.',
      recommendation:
        'Everywhere else in the app icons go through <app-icon [path]="…" />, which needs no sanitizer bypass. Never pass user input to bypassSecurityTrustHtml.'
    },
    {
      severity: 'low',
      title: 'Environment placeholder values',
      files: ['environment.ts', 'environment.prod.ts'],
      description: 'The environment files ship with placeholder values that must be replaced before deployment.',
      recommendation: 'Inject real values at build time. Never commit API keys.'
    },
    {
      severity: 'low',
      title: 'No Content Security Policy',
      files: ['index.html'],
      description: 'index.html does not define a Content-Security-Policy meta tag.',
      recommendation: 'Serve CSP headers from your host to restrict script sources. Note that the template download uses a blob URL, which needs no external origin.'
    }
  ];

  readonly positiveFindings: PositiveFinding[] = [
    {
      title: 'Sanitizer bypasses removed',
      description:
        'Icons now render as <svg> with a bound path instead of [innerHTML]. This also fixed a real bug: the sanitizer was silently stripping the SVG, so the icons were not rendering at all.'
    },
    {
      title: 'No zone.js',
      description: 'Zoneless change detection means no monkey-patching of global timers, XHR or event APIs at startup.'
    },
    {
      title: 'Route guard',
      description: 'authGuard (CanActivateFn) protects /profile and /settings, and the auth pages live in their own layout outside the dashboard shell.'
    },
    {
      title: 'No external calls for avatars',
      description: 'Avatars are generated locally from initials with a color derived from the name. No user display name is ever sent to a third-party service.'
    },
    {
      title: 'Strict TypeScript and templates',
      description: 'strict, strictTemplates, strictStandalone and noPropertyAccessFromIndexSignature are all on.'
    },
    {
      title: 'No hardcoded secrets',
      description: 'No secrets or API keys in the source. localStorage helpers fail closed when storage is unavailable.'
    }
  ];

  getSeverityVariant(severity: string): 'danger' | 'warning' | 'secondary' {
    switch (severity) {
      case 'critical': return 'danger';
      case 'medium': return 'warning';
      default: return 'secondary';
    }
  }
}
