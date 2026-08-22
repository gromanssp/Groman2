import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CodeSnippetComponent } from '../../../../shared/components/code-snippet/code-snippet.component';
import { SkeletonComponent } from '../../../../shared/components/skeleton/skeleton.component';
import { EmptyStateComponent } from '../../../../shared/components/empty-state/empty-state.component';
import { SkeletonDirective } from '../../../../directives/skeleton.directive';

@Component({
  selector: 'app-skeletons-section',
  templateUrl: './skeletons-section.component.html',
  styleUrl: '../section-shared.css',
  imports: [SkeletonComponent, EmptyStateComponent, SkeletonDirective, CodeSnippetComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkeletonsSectionComponent {
  protected readonly loading = signal(true);

  protected readonly codes = {
    component: `<app-skeleton [lines]="3" />\n<app-skeleton shape="circle" width="48px" height="48px" />\n<app-skeleton shape="block" height="120px" />`,
    directive: `<!-- Keeps the real content in the DOM, masks it while loading -->\n<h3 [appSkeleton]="loading()">{{ user().name }}</h3>\n<p [appSkeleton]="loading()">{{ user().email }}</p>`,
    empty: `<app-empty-state title="No projects yet" description="Create one to get started.">\n  <button empty-action class="btn btn-gradient">New project</button>\n</app-empty-state>`
  };

  protected toggle(): void {
    this.loading.update(value => !value);
  }
}
