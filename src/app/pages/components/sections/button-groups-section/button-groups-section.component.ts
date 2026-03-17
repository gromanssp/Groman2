import { Component } from '@angular/core';
import { CodeSnippetComponent } from '../../../../shared/components/code-snippet/code-snippet.component';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-button-groups-section',
    templateUrl: './button-groups-section.component.html',
    styleUrl: './button-groups-section.component.css',
    imports: [CodeSnippetComponent, NgClass]
})
export class ButtonGroupsSectionComponent {
  activeIndex = 1;
  activeSize = 'md';

  codes = {
    basic: `<div class="btn-group">\n  <button class="btn btn-primary">Left</button>\n  <button class="btn btn-primary">Center</button>\n  <button class="btn btn-primary">Right</button>\n</div>`,
    active: `<div class="btn-group">\n  <button class="btn"\n    [class.btn-primary]="activeIndex === 0"\n    [class.btn-outline-primary]="activeIndex !== 0"\n    (click)="activeIndex = 0">First</button>\n</div>`,
    outline: `<div class="btn-group">\n  <button class="btn btn-outline-primary">Option A</button>\n  <button class="btn btn-outline-primary">Option B</button>\n  <button class="btn btn-outline-primary">Option C</button>\n</div>`,
    sizes: `<div class="btn-group">\n  <button class="btn btn-success btn-sm">A</button>\n  <button class="btn btn-success btn-sm">B</button>\n</div>`,
    mixed: `<div class="btn-group">\n  <button class="btn btn-primary">Save</button>\n  <button class="btn btn-secondary">Draft</button>\n  <button class="btn btn-danger">Delete</button>\n</div>`
  };
}
