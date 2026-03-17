import { Component } from '@angular/core';
import { CodeSnippetComponent } from '../../../../shared/components/code-snippet/code-snippet.component';

@Component({
    selector: 'app-navs-section',
    templateUrl: './navs-section.component.html',
    styleUrl: './navs-section.component.css',
    imports: [CodeSnippetComponent]
})
export class NavsSectionComponent {
  activeTab = 'home';
  activePill = 'overview';
  activeVertical = 'profile';

  codes = {
    tabs: `<nav class="nav nav-tabs">\n  <a class="nav-item nav-link active">Home</a>\n  <a class="nav-item nav-link">Features</a>\n</nav>`,
    pills: `<nav class="nav nav-pills">\n  <a class="nav-item nav-link active">Overview</a>\n  <a class="nav-item nav-link">Analytics</a>\n</nav>`,
    vertical: `<nav class="nav nav-vertical">\n  <a class="nav-item nav-link active">Profile</a>\n  <a class="nav-item nav-link">Account</a>\n</nav>`
  };
}
