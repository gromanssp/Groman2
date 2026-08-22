/**
 * Shared vocabulary for every UI component in the library.
 *
 * Components accept these unions instead of inventing their own, so `size` and
 * `variant` mean the same thing on a button, a badge, an alert or an input.
 */

export type UiSize = 'sm' | 'md' | 'lg';

export type UiVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'ghost'
  | 'outline';

export type UiPlacement = 'top' | 'bottom' | 'left' | 'right';

export type UiStatus = 'idle' | 'loading' | 'success' | 'error';

/** Design-token pixel values behind each `UiSize`. */
export const UI_SIZE_PX: Record<UiSize, number> = { sm: 20, md: 36, lg: 56 };
