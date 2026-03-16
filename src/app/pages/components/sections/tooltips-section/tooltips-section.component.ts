import { Component } from '@angular/core';

@Component({
  selector: 'app-tooltips-section',
  templateUrl: './tooltips-section.component.html',
  styleUrl: './tooltips-section.component.css'
})
export class TooltipsSectionComponent {
  codes = {
    positions: `<button class="btn btn-primary"\n  appTooltip="Tooltip on top"\n  tooltipPosition="top">Top</button>\n\n<button class="btn btn-secondary"\n  appTooltip="Tooltip on bottom"\n  tooltipPosition="bottom">Bottom</button>`,
    elements: `<span appTooltip="Tooltip text"\n  tooltipPosition="top">Hover me</span>`,
    contextual: `<button class="btn btn-danger"\n  appTooltip="This action cannot be undone"\n  tooltipPosition="top">Delete</button>`
  };
}
