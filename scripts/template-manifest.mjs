/**
 * Declares what goes into the downloadable starter template.
 *
 * `MIRRORED` files are copied verbatim from this app's `src/`, so the template
 * can never drift from the code you are actually looking at. Anything the
 * template needs to differ on (routes, package.json, the sidebar menu) lives in
 * `src/app/pages/docs/template-src/_overrides/` instead.
 */

/** Directories mirrored wholesale, relative to `src/`. */
export const MIRRORED_DIRS = [
  'app/shared',
  'app/directives',
  'app/services',
  'app/layouts/dashboard',
  'app/layouts/auth',
  'app/components/navbar',
  'app/components/sidebar',
  'app/components/stat-card',
  'app/pages/home',
  'app/pages/profile',
  'app/pages/settings',
  'app/pages/calendar',
  'app/pages/login',
  'app/pages/register',
  'app/pages/not-found'
];

/** Individual mirrored files, relative to `src/`. */
export const MIRRORED_FILES = ['styles.css', 'main.ts', 'app/app.component.ts', 'app/app.component.html', 'app/app.component.css'];

/** Mirrored files that must NOT ship (docs-only, or replaced by an override). */
export const EXCLUDED = ['app/components/sidebar/nav-items.ts', '.spec.ts'];

/**
 * Files authored specifically for the template.
 * Key = path inside `_overrides/`, value = destination inside the ZIP.
 */
export const OVERRIDES = {
  'package.json.txt': 'package.json',
  'angular.json.txt': 'angular.json',
  'tsconfig.json.txt': 'tsconfig.json',
  'tsconfig.app.json.txt': 'tsconfig.app.json',
  'editorconfig.txt': '.editorconfig',
  'gitignore.txt': '.gitignore',
  'index.html.txt': 'src/index.html',
  'app.config.ts.txt': 'src/app/app.config.ts',
  'app.routes.ts.txt': 'src/app/app.routes.ts',
  'nav-items.ts.txt': 'src/app/components/sidebar/nav-items.ts',
  'README.md.txt': 'README.md'
};

/** Where mirrored sources land inside the ZIP. */
export const ZIP_SRC_ROOT = 'src';

export function isExcluded(relativePath) {
  return EXCLUDED.some(pattern => relativePath.includes(pattern));
}
