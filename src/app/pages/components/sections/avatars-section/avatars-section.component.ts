import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AvatarComponent } from '../../../../shared/components/avatar/avatar.component';
import { CodeSnippetComponent } from '../../../../shared/components/code-snippet/code-snippet.component';

@Component({
  selector: 'app-avatars-section',
  templateUrl: './avatars-section.component.html',
  styleUrl: '../section-shared.css',
  imports: [AvatarComponent, CodeSnippetComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AvatarsSectionComponent {
  protected readonly people = ['Ada Lovelace', 'Grace Hopper', 'Alan Turing', 'Katherine Johnson'];

  protected readonly codes = {
    initials: `<app-avatar name="Ada Lovelace" />\n<app-avatar name="Grace Hopper" size="lg" />\n<app-avatar name="Alan Turing" [size]="72" square />`,
    status: `<app-avatar name="Ada Lovelace" status="online" />\n<app-avatar name="Alan Turing" status="busy" />`,
    fallback: `<!-- A broken src falls back to initials, never a broken image -->\n<app-avatar name="Katherine Johnson" src="/does-not-exist.png" />`
  };
}
