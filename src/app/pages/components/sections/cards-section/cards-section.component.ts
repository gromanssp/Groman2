import { Component } from '@angular/core';
import { CodeSnippetComponent } from '../../../../shared/components/code-snippet/code-snippet.component';

@Component({
    selector: 'app-cards-section',
    templateUrl: './cards-section.component.html',
    styleUrl: './cards-section.component.css',
    imports: [CodeSnippetComponent]
})
export class CardsSectionComponent {
  chartBars = [
    { height: 40, color: '#6366f1' },
    { height: 65, color: '#3b82f6' },
    { height: 30, color: '#10b981' },
    { height: 80, color: '#f97316' },
    { height: 55, color: '#8b5cf6' },
    { height: 45, color: '#eab308' },
    { height: 70, color: '#6366f1' },
    { height: 35, color: '#10b981' },
    { height: 90, color: '#3b82f6' },
    { height: 50, color: '#ef4444' },
    { height: 60, color: '#14b8a6' },
    { height: 75, color: '#f97316' },
  ];

  codes = {
    basic: `<div class="glass-panel">\n  <h4>Card Title</h4>\n  <p>Card content here...</p>\n</div>`,
    headerFooter: `<div class="glass-panel">\n  <div class="card-header">Featured</div>\n  <div class="card-body">...</div>\n  <div class="card-footer">...</div>\n</div>`,
    image: `<div class="glass-panel">\n  <img src="..." class="card-image" />\n  <div class="card-body">...</div>\n</div>`,
    horizontal: `<div class="glass-panel horizontal-card">\n  <div class="card-image-side">...</div>\n  <div class="card-body">...</div>\n</div>`,
    feature: `<div class="feature-card">\n  <div class="feature-icon" style="--fc-color: #7c3aed;">\n    <svg>...</svg>\n  </div>\n  <h4 class="feature-title">Title</h4>\n  <p class="feature-desc">Description</p>\n  <div class="feature-content">\n    <!-- Card-specific content -->\n  </div>\n</div>`,
  };
}
