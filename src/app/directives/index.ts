import { AutofocusDirective } from './autofocus.directive';
import { CellTemplateDirective } from './cell-template.directive';
import { ClickOutsideDirective } from './click-outside.directive';
import { CollapseDirective } from './collapse.directive';
import { LazyImgDirective } from './lazy-img.directive';
import { LetDirective } from './let.directive';
import { PermissionDirective } from './permission.directive';
import { RippleDirective } from './ripple.directive';
import { SkeletonDirective } from './skeleton.directive';
import { TooltipDirective } from './tooltip.directive';

export * from './autofocus.directive';
export * from './cell-template.directive';
export * from './click-outside.directive';
export * from './collapse.directive';
export * from './lazy-img.directive';
export * from './let.directive';
export * from './permission.directive';
export * from './ripple.directive';
export * from './skeleton.directive';
export * from './tooltip.directive';

/**
 * Spread into a component's `imports` to get the whole directive kit at once:
 *
 * ```ts
 * imports: [...UI_DIRECTIVES]
 * ```
 */
export const UI_DIRECTIVES = [
  AutofocusDirective,
  CellTemplateDirective,
  ClickOutsideDirective,
  CollapseDirective,
  LazyImgDirective,
  LetDirective,
  PermissionDirective,
  RippleDirective,
  SkeletonDirective,
  TooltipDirective
] as const;
