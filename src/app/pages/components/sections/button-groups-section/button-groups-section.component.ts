import { Component, HostListener } from '@angular/core';
import { CodeSnippetComponent } from '../../../../shared/components/code-snippet/code-snippet.component';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-button-groups-section',
    templateUrl: './button-groups-section.component.html',
    styleUrl: './button-groups-section.component.css',
    imports: [CodeSnippetComponent, NgClass, RouterLink]
})
export class ButtonGroupsSectionComponent {
  activeIndex = 1;
  activeSize = 'md';
  openDropdown: string | null = null;

  toggleDropdown(id: string): void {
    this.openDropdown = this.openDropdown === id ? null : id;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.btn-dropdown')) {
      this.openDropdown = null;
    }
  }

  codes = {
    dropdown: `<div class="btn-dropdown">\n  <button class="btn btn-primary"\n    (click)="toggleDropdown()">\n    Components\n    <svg class="dropdown-chevron">...</svg>\n  </button>\n  @if (isOpen) {\n    <div class="dropdown-menu">\n      <a class="dropdown-item"\n        routerLink="/components/buttons">\n        Buttons\n      </a>\n      <div class="dropdown-divider"></div>\n      <a class="dropdown-item"\n        routerLink="/components/tables">\n        Tables\n      </a>\n    </div>\n  }\n</div>`,
    splitDropdown: `<div class="btn-group">\n  <button class="btn btn-success">Save</button>\n  <div class="btn-dropdown">\n    <button class="btn btn-success split-toggle"\n      (click)="toggleDropdown()">\n      <svg class="dropdown-chevron">...</svg>\n    </button>\n    @if (isOpen) {\n      <div class="dropdown-menu">\n        <a class="dropdown-item">Save as Draft</a>\n        <a class="dropdown-item">Save & Publish</a>\n      </div>\n    }\n  </div>\n</div>`,
    dropdownVariants: `<div class="btn-dropdown">\n  <button class="btn btn-primary"\n    (click)="toggleDropdown()">\n    Primary <svg>...</svg>\n  </button>\n  @if (isOpen) {\n    <div class="dropdown-menu">...</div>\n  }\n</div>`,
    basic: `<div class="btn-group">\n  <button class="btn btn-primary">Left</button>\n  <button class="btn btn-primary">Center</button>\n  <button class="btn btn-primary">Right</button>\n</div>`,
    active: `<div class="btn-group">\n  <button class="btn"\n    [class.btn-primary]="activeIndex === 0"\n    [class.btn-outline-primary]="activeIndex !== 0"\n    (click)="activeIndex = 0">First</button>\n</div>`,
    outline: `<div class="btn-group">\n  <button class="btn btn-outline-primary">Option A</button>\n  <button class="btn btn-outline-primary">Option B</button>\n  <button class="btn btn-outline-primary">Option C</button>\n</div>`,
    sizes: `<div class="btn-group">\n  <button class="btn btn-success btn-sm">A</button>\n  <button class="btn btn-success btn-sm">B</button>\n</div>`,
    mixed: `<div class="btn-group">\n  <button class="btn btn-primary">Save</button>\n  <button class="btn btn-secondary">Draft</button>\n  <button class="btn btn-danger">Delete</button>\n</div>`
  };
}
