import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CodeSnippetComponent } from '../../../../shared/components/code-snippet/code-snippet.component';
import { TabDirective } from '../../../../shared/components/tabs/tab.directive';
import { TabsComponent } from '../../../../shared/components/tabs/tabs.component';

@Component({
  selector: 'app-tabs-section',
  templateUrl: './tabs-section.component.html',
  styleUrl: '../section-shared.css',
  imports: [TabsComponent, TabDirective, CodeSnippetComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabsSectionComponent {
  protected readonly codes = {
    basic: `<app-tabs>\n  <ng-template appTab="Overview">Panel one</ng-template>\n  <ng-template appTab="Activity">Panel two</ng-template>\n  <ng-template appTab="Archived" [tabDisabled]="true">Panel three</ng-template>\n</app-tabs>`,
    pill: `<app-tabs variant="pill" [(selectedIndex)]="tab">…</app-tabs>`
  };
}
