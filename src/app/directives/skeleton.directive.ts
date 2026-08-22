import { booleanAttribute, Directive, input } from '@angular/core';

/**
 * Turns any block into a shimmering placeholder while `appSkeleton` is true.
 *
 * ```html
 * <p [appSkeleton]="loading()">{{ user().name }}</p>
 * ```
 *
 * Content stays in the DOM (so layout does not jump) but is hidden from both
 * sighted users and screen readers until the data arrives.
 */
@Directive({
  selector: '[appSkeleton]',
  host: {
    '[class.is-skeleton]': 'loading()',
    '[attr.aria-busy]': 'loading() ? "true" : null',
    '[attr.aria-hidden]': 'loading() ? "true" : null'
  }
})
export class SkeletonDirective {
  readonly loading = input(false, { alias: 'appSkeleton', transform: booleanAttribute });
}
