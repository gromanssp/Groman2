import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrl: './modal.component.css',
    imports: [NgClass]
})
export class ModalComponent {
  @Input() isOpen = false;
  @Input() title = '';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Output() closed = new EventEmitter<void>();

  close(): void {
    this.closed.emit();
  }

  onBackdropClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('modal-backdrop')) {
      this.close();
    }
  }
}
