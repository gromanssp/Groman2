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
  readonly mediumCount = 2;
  readonly lowCount = 3;

  readonly findings: SecurityFinding[] = [
    {
      severity: 'medium',
      title: 'innerHTML Usage (XSS Risk)',
      files: ['stat-card.component.html', 'icons-section.component.html'],
      description: '[innerHTML] binding used for SVG icons. While data sources are internal (not user-provided), this bypasses Angular\'s built-in XSS sanitization.',
      recommendation: 'Use DomSanitizer for explicit sanitization or replace with inline SVG templates.'
    },
    {
      severity: 'medium',
      title: 'Environment Placeholder Credentials',
      files: ['environment.ts', 'environment.prod.ts'],
      description: 'Firebase configuration contains placeholder values (YOUR_API_KEY, etc.). These must be replaced before deployment.',
      recommendation: 'Use environment variable injection for production builds. Never commit real API keys.'
    },
    {
      severity: 'low',
      title: 'Firebase Error Code Exposure',
      files: ['login.component.ts', 'register.component.ts'],
      description: 'Firebase auth error codes (user-not-found, wrong-password) are mapped to specific user messages, enabling user enumeration attacks.',
      recommendation: 'Use a single generic error message for all auth failures.'
    },
    {
      severity: 'low',
      title: 'External Avatar URL Exposure',
      files: ['profile.component.ts', 'navbar.component.html'],
      description: 'User display names are sent to ui-avatars.com API as URL parameters.',
      recommendation: 'Hash or truncate names, or use local avatar generation.'
    },
    {
      severity: 'low',
      title: 'No Content Security Policy',
      files: [],
      description: 'index.html does not define a Content-Security-Policy meta tag.',
      recommendation: 'Add CSP headers to restrict script sources and prevent XSS.'
    }
  ];

  readonly positiveFindings: PositiveFinding[] = [
    { title: 'Angular XSS Protection', description: 'Angular\'s built-in XSS protection via property binding is active throughout the application.' },
    { title: 'Firebase Auth', description: 'Firebase Auth provides secure authentication with industry-standard practices.' },
    { title: 'Route Guard', description: 'authGuard (CanActivateFn) protects all authenticated pages from unauthorized access.' },
    { title: 'No Hardcoded Secrets', description: 'No hardcoded secrets or API keys found in source code.' },
    { title: 'Dependency Injection', description: 'Dependency injection pattern used throughout, avoiding global mutable state.' }
  ];

  getSeverityVariant(severity: string): 'danger' | 'warning' | 'secondary' {
    switch (severity) {
      case 'critical': return 'danger';
      case 'medium': return 'warning';
      default: return 'secondary';
    }
  }
}
