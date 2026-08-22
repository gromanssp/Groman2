import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CodeSnippetComponent } from '../../../../shared/components/code-snippet/code-snippet.component';
import { TimelineComponent, TimelineItem } from '../../../../shared/components/timeline/timeline.component';

@Component({
  selector: 'app-timeline-section',
  templateUrl: './timeline-section.component.html',
  styleUrl: '../section-shared.css',
  imports: [TimelineComponent, CodeSnippetComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimelineSectionComponent {
  protected readonly activity: TimelineItem[] = [
    { title: 'Deployment succeeded', description: 'v0.3.0 shipped to production.', timestamp: '10 min ago', variant: 'success' },
    { title: 'Pull request merged', description: 'Zoneless change detection enabled.', timestamp: '2 h ago', variant: 'primary' },
    { title: 'Build warning', description: 'Bundle grew by 4 kB.', timestamp: 'Yesterday', variant: 'warning' },
    { title: 'Account created', description: 'Welcome to Groman2.', timestamp: 'Last week', variant: 'secondary' }
  ];

  protected readonly codes = {
    basic: `activity: TimelineItem[] = [\n  { title: 'Deployment succeeded', timestamp: '10 min ago', variant: 'success' },\n  { title: 'Build warning', timestamp: 'Yesterday', variant: 'warning' }\n];\n\n<app-timeline [items]="activity" />`
  };
}
