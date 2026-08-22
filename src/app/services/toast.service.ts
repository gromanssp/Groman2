import { Injectable, signal } from '@angular/core';

export type ToastVariant = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: string;
  variant: ToastVariant;
  title: string;
  message?: string;
  /** Milliseconds before auto-dismiss. `0` keeps the toast until dismissed. */
  duration: number;
}

export interface ToastOptions {
  message?: string;
  duration?: number;
}

const DEFAULT_DURATION = 4000;

@Injectable({ providedIn: 'root' })
export class ToastService {
  private readonly _toasts = signal<Toast[]>([]);
  private readonly timers = new Map<string, ReturnType<typeof setTimeout>>();

  readonly toasts = this._toasts.asReadonly();

  success(title: string, options?: ToastOptions): string {
    return this.show('success', title, options);
  }

  error(title: string, options?: ToastOptions): string {
    return this.show('error', title, options);
  }

  warning(title: string, options?: ToastOptions): string {
    return this.show('warning', title, options);
  }

  info(title: string, options?: ToastOptions): string {
    return this.show('info', title, options);
  }

  show(variant: ToastVariant, title: string, options: ToastOptions = {}): string {
    const toast: Toast = {
      id: crypto.randomUUID(),
      variant,
      title,
      message: options.message,
      duration: options.duration ?? DEFAULT_DURATION
    };

    this._toasts.update(list => [...list, toast]);

    if (toast.duration > 0) {
      this.timers.set(toast.id, setTimeout(() => this.dismiss(toast.id), toast.duration));
    }

    return toast.id;
  }

  dismiss(id: string): void {
    const timer = this.timers.get(id);
    if (timer) {
      clearTimeout(timer);
      this.timers.delete(id);
    }
    this._toasts.update(list => list.filter(t => t.id !== id));
  }

  clear(): void {
    for (const timer of this.timers.values()) {
      clearTimeout(timer);
    }
    this.timers.clear();
    this._toasts.set([]);
  }
}
