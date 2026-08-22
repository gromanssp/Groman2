import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ToastService } from './toast.service';

describe('ToastService', () => {
  let service: ToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideZonelessChangeDetection()] });
    service = TestBed.inject(ToastService);
  });

  afterEach(() => service.clear());

  it('queues a toast with its variant and message', () => {
    service.success('Saved', { message: 'All good' });

    expect(service.toasts().length).toBe(1);
    expect(service.toasts()[0].variant).toBe('success');
    expect(service.toasts()[0].message).toBe('All good');
  });

  it('dismisses a toast by id', () => {
    const id = service.error('Nope');
    service.dismiss(id);

    expect(service.toasts().length).toBe(0);
  });

  it('keeps a toast with duration 0 until dismissed', done => {
    service.info('Sticky', { duration: 0 });

    setTimeout(() => {
      expect(service.toasts().length).toBe(1);
      done();
    }, 20);
  });
});
