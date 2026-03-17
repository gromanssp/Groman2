import { Component } from '@angular/core';
import { CodeSnippetComponent } from '../../../../shared/components/code-snippet/code-snippet.component';

@Component({
    selector: 'app-cards-section',
    templateUrl: './cards-section.component.html',
    styleUrl: './cards-section.component.css',
    imports: [CodeSnippetComponent]
})
export class CardsSectionComponent {
  codes = {
    basic: `<div class="glass-panel">\n  <h4>Card Title</h4>\n  <p>Card content here...</p>\n</div>`,
    headerFooter: `<div class="glass-panel">\n  <div class="card-header">Featured</div>\n  <div class="card-body">...</div>\n  <div class="card-footer">...</div>\n</div>`,
    image: `<div class="glass-panel">\n  <img src="..." class="card-image" />\n  <div class="card-body">...</div>\n</div>`,
    horizontal: `<div class="glass-panel horizontal-card">\n  <div class="card-image-side">...</div>\n  <div class="card-body">...</div>\n</div>`
  };
}
