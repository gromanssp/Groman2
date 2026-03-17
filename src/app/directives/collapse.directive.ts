import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

@Directive({ selector: '[appCollapse]' })
export class CollapseDirective implements OnChanges {
  @Input('appCollapse') isCollapsed = false;

  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.renderer.setStyle(this.el.nativeElement, 'overflow', 'hidden');
    this.renderer.setStyle(this.el.nativeElement, 'transition', 'max-height 0.3s ease, opacity 0.3s ease');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isCollapsed']) {
      if (this.isCollapsed) {
        this.collapse();
      } else {
        this.expand();
      }
    }
  }

  private collapse(): void {
    const el = this.el.nativeElement;
    this.renderer.setStyle(el, 'maxHeight', el.scrollHeight + 'px');
    requestAnimationFrame(() => {
      this.renderer.setStyle(el, 'maxHeight', '0');
      this.renderer.setStyle(el, 'opacity', '0');
    });
  }

  private expand(): void {
    const el = this.el.nativeElement;
    this.renderer.setStyle(el, 'maxHeight', el.scrollHeight + 'px');
    this.renderer.setStyle(el, 'opacity', '1');
    const onEnd = () => {
      this.renderer.setStyle(el, 'maxHeight', 'none');
      el.removeEventListener('transitionend', onEnd);
    };
    el.addEventListener('transitionend', onEnd);
  }
}
