import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginationComponent } from './pagination.component';

describe('PaginationComponent', () => {
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginationComponent],
      providers: [provideZonelessChangeDetection()]
    }).compileComponents();

    fixture = TestBed.createComponent(PaginationComponent);
  });

  it('computes the number of pages from total and page size', () => {
    fixture.componentRef.setInput('total', 47);
    fixture.componentRef.setInput('pageSize', 10);
    fixture.detectChanges();

    expect(fixture.componentInstance.totalPages()).toBe(5);
  });

  it('always reports at least one page', () => {
    fixture.componentRef.setInput('total', 0);
    fixture.detectChanges();

    expect(fixture.componentInstance.totalPages()).toBe(1);
  });

  it('emits the clamped page when a page button is clicked', async () => {
    fixture.componentRef.setInput('total', 30);
    fixture.componentRef.setInput('pageSize', 10);
    fixture.detectChanges();
    await fixture.whenStable();

    const emitted: number[] = [];
    fixture.componentInstance.pageChange.subscribe(page => emitted.push(page));

    const buttons = (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLButtonElement>('.page-btn');
    buttons[buttons.length - 1].click(); // "next"
    await fixture.whenStable();

    expect(emitted).toEqual([2]);
    expect(fixture.componentInstance.page()).toBe(2);
  });
});
