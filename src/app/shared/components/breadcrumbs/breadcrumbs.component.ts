import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map, startWith } from 'rxjs/operators';
import { NavigationEnd } from '@angular/router';

export interface Crumb {
  label: string;
  url: string;
}

/**
 * Trail built from each route's `data.breadcrumb`, so adding a route is enough
 * to make it appear here.
 */
@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrl: './breadcrumbs.component.css',
  imports: [RouterLink],
  host: { role: 'navigation', 'aria-label': 'Breadcrumb' },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BreadcrumbsComponent {
  readonly homeLabel = input('Home');
  readonly homeUrl = input('/home');

  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  private readonly navigationEnd = toSignal(
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.router.url),
      startWith(this.router.url)
    ),
    { initialValue: this.router.url }
  );

  protected readonly crumbs = computed<Crumb[]>(() => {
    this.navigationEnd(); // re-run on every navigation
    return this.collect(this.route.root, '', []);
  });

  private collect(route: ActivatedRoute, url: string, acc: Crumb[]): Crumb[] {
    for (const child of route.children) {
      const segment = child.snapshot.url.map(s => s.path).join('/');
      const nextUrl = segment ? `${url}/${segment}` : url;
      const label = child.snapshot.data['breadcrumb'] as string | undefined;

      if (label && !acc.some(crumb => crumb.url === nextUrl)) {
        acc.push({ label, url: nextUrl });
      }
      return this.collect(child, nextUrl, acc);
    }
    return acc;
  }
}
