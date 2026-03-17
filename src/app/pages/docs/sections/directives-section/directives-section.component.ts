import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CodeSnippetComponent } from '../../../../shared/components/code-snippet/code-snippet.component';

interface DirectiveInput {
  name: string;
  type: string;
  default: string;
  description: string;
}

interface DirectiveDoc {
  name: string;
  selector: string;
  description: string;
  inputs: DirectiveInput[];
  usage: string;
}

@Component({
  selector: 'app-directives-section',
  standalone: true,
  templateUrl: './directives-section.component.html',
  styleUrl: './directives-section.component.css',
  imports: [CodeSnippetComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DirectivesSectionComponent {
  readonly directives: DirectiveDoc[] = [
    {
      name: 'TooltipDirective',
      selector: '[appTooltip]',
      description: 'Adds a tooltip popup on hover with configurable position. The tooltip is created dynamically and positioned relative to the host element.',
      inputs: [
        { name: 'appTooltip', type: 'string', default: "''", description: 'The text to display in the tooltip' },
        { name: 'tooltipPosition', type: "'top' | 'bottom' | 'left' | 'right'", default: "'top'", description: 'Position of the tooltip relative to the host element' }
      ],
      usage: '<button appTooltip="Click me" tooltipPosition="bottom">Hover</button>'
    },
    {
      name: 'CollapseDirective',
      selector: '[appCollapse]',
      description: 'Toggles the visibility of the host element with a smooth height transition. When collapsed, the element height is set to 0 with overflow hidden.',
      inputs: [
        { name: 'appCollapse', type: 'boolean', default: 'false', description: 'When true, the element is collapsed (hidden)' }
      ],
      usage: `<div [appCollapse]="isCollapsed">
  <p>This content will collapse and expand smoothly.</p>
</div>`
    }
  ];
}
