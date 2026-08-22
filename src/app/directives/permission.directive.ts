import { Directive, effect, inject, input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService, UserRole } from '../services/auth.service';

/**
 * Renders the host template only when the signed-in user holds one of the
 * given roles.
 *
 * ```html
 * <button *appPermission="'admin'">Delete</button>
 * <nav *appPermission="['admin', 'editor']"> ... </nav>
 * ```
 *
 * This is a UX affordance, not a security boundary - guard the route and the
 * API as well (see `authGuard`).
 */
@Directive({ selector: '[appPermission]' })
export class PermissionDirective {
  readonly roles = input.required<UserRole | readonly UserRole[]>({ alias: 'appPermission' });

  private readonly auth = inject(AuthService);
  private readonly view = inject(ViewContainerRef);
  private readonly template = inject<TemplateRef<unknown>>(TemplateRef);

  constructor() {
    effect(() => {
      const required = this.roles();
      const allowed = Array.isArray(required) ? required : [required as UserRole];
      const role = this.auth.role();
      const granted = role !== null && allowed.includes(role);

      this.view.clear();
      if (granted) {
        this.view.createEmbeddedView(this.template);
      }
    });
  }
}
