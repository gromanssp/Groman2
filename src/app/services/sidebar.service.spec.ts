import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { SidebarService } from './sidebar.service';

describe('SidebarService', () => {
  let service: SidebarService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({ providers: [provideZonelessChangeDetection()] });
    service = TestBed.inject(SidebarService);
  });

  it('toggles the desktop collapse state', () => {
    expect(service.collapsed()).toBe(false);

    service.toggle();
    expect(service.collapsed()).toBe(true);

    service.expand();
    expect(service.collapsed()).toBe(false);
  });

  it('opens and closes the mobile drawer independently', () => {
    service.openMobile();
    expect(service.mobileOpen()).toBe(true);
    expect(service.collapsed()).toBe(false);

    service.closeMobile();
    expect(service.mobileOpen()).toBe(false);
  });
});
