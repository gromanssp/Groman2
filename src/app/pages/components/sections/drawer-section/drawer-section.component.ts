import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CodeSnippetComponent } from '../../../../shared/components/code-snippet/code-snippet.component';
import { DrawerComponent } from '../../../../shared/components/drawer/drawer.component';

@Component({
  selector: 'app-drawer-section',
  templateUrl: './drawer-section.component.html',
  styleUrl: '../section-shared.css',
  imports: [DrawerComponent, CodeSnippetComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DrawerSectionComponent {
  protected readonly rightOpen = signal(false);
  protected readonly leftOpen = signal(false);

  protected readonly codes = {
    basic: `<button class="btn btn-gradient" (click)="open.set(true)">Filters</button>\n\n<app-drawer title="Filters" [(open)]="open">\n  <p>Panel body</p>\n  <button drawer-footer class="btn btn-primary">Apply</button>\n</app-drawer>`,
    side: `<app-drawer side="left" width="300px" [(open)]="navOpen">…</app-drawer>`
  };
}
