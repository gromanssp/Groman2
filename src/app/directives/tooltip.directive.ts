import { Directive, ElementRef, Input, OnDestroy, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[appTooltip]'
})
export class TooltipDirective implements OnDestroy {
  @Input('appTooltip') tooltipText = '';
  @Input() tooltipPosition: 'top' | 'bottom' | 'left' | 'right' = 'top';

  private tooltipEl: HTMLElement | null = null;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter')
  onMouseEnter(): void {
    if (!this.tooltipText) return;
    this.show();
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.hide();
  }

  private show(): void {
    this.tooltipEl = this.renderer.createElement('div');
    this.renderer.addClass(this.tooltipEl, 'app-tooltip');
    this.renderer.addClass(this.tooltipEl, `tooltip-${this.tooltipPosition}`);

    const text = this.renderer.createText(this.tooltipText);
    this.renderer.appendChild(this.tooltipEl, text);
    this.renderer.appendChild(document.body, this.tooltipEl);

    this.setPosition();

    this.renderer.setStyle(this.tooltipEl, 'opacity', '1');
    this.renderer.setStyle(this.tooltipEl, 'transform', 'translate(-50%, 0) scale(1)');
  }

  private hide(): void {
    if (this.tooltipEl) {
      this.renderer.removeChild(document.body, this.tooltipEl);
      this.tooltipEl = null;
    }
  }

  private setPosition(): void {
    if (!this.tooltipEl) return;

    const hostRect = this.el.nativeElement.getBoundingClientRect();
    const gap = 8;
    let top: number;
    let left: number;

    switch (this.tooltipPosition) {
      case 'bottom':
        top = hostRect.bottom + gap;
        left = hostRect.left + hostRect.width / 2;
        break;
      case 'left':
        top = hostRect.top + hostRect.height / 2;
        left = hostRect.left - gap;
        this.renderer.setStyle(this.tooltipEl, 'transform', 'translate(-100%, -50%) scale(1)');
        break;
      case 'right':
        top = hostRect.top + hostRect.height / 2;
        left = hostRect.right + gap;
        this.renderer.setStyle(this.tooltipEl, 'transform', 'translate(0, -50%) scale(1)');
        break;
      default: // top
        top = hostRect.top - gap;
        left = hostRect.left + hostRect.width / 2;
        this.renderer.setStyle(this.tooltipEl, 'transform', 'translate(-50%, -100%) scale(1)');
        break;
    }

    this.renderer.setStyle(this.tooltipEl, 'top', `${top}px`);
    this.renderer.setStyle(this.tooltipEl, 'left', `${left}px`);
  }

  ngOnDestroy(): void {
    this.hide();
  }
}
