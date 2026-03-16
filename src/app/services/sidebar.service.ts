import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private _collapsed = new BehaviorSubject<boolean>(false);
  private _mobileOpen = new BehaviorSubject<boolean>(false);

  collapsed$ = this._collapsed.asObservable();
  mobileOpen$ = this._mobileOpen.asObservable();

  get isCollapsed(): boolean {
    return this._collapsed.value;
  }

  toggle(): void {
    this._collapsed.next(!this._collapsed.value);
  }

  collapse(): void {
    this._collapsed.next(true);
  }

  expand(): void {
    this._collapsed.next(false);
  }

  toggleMobile(): void {
    this._mobileOpen.next(!this._mobileOpen.value);
  }

  openMobile(): void {
    this._mobileOpen.next(true);
  }

  closeMobile(): void {
    this._mobileOpen.next(false);
  }
}
