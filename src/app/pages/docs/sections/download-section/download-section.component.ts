import { ChangeDetectionStrategy, Component, computed, inject, resource, signal } from '@angular/core';
import { AlertComponent } from '../../../../shared/components/alert/alert.component';
import { CodeSnippetComponent } from '../../../../shared/components/code-snippet/code-snippet.component';
import { ProgressBarComponent } from '../../../../shared/components/progress-bar/progress-bar.component';
import { SpinnerComponent } from '../../../../shared/components/spinner/spinner.component';
import { TemplateGeneratorService } from '../../services/template-generator.service';
import { ToastService } from '../../../../services/toast.service';

@Component({
  selector: 'app-download-section',
  templateUrl: './download-section.component.html',
  styleUrl: './download-section.component.css',
  imports: [CodeSnippetComponent, SpinnerComponent, ProgressBarComponent, AlertComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DownloadSectionComponent {
  private readonly generator = inject(TemplateGeneratorService);
  private readonly toasts = inject(ToastService);

  protected readonly isGenerating = signal(false);
  protected readonly errorMessage = signal('');

  protected readonly processed = this.generator.processed;
  protected readonly totalFiles = this.generator.totalFiles;
  protected readonly progress = computed(() => {
    const total = this.totalFiles();
    return total === 0 ? 0 : Math.round((this.processed() / total) * 100);
  });

  /** The manifest is the single source of truth for what ships. */
  private readonly manifest = resource({
    loader: () => this.generator.loadManifest()
  });

  protected readonly fileCount = computed(() => this.manifest.value()?.files.length ?? 0);

  /** File tree rendered from the manifest, so it can never go stale. */
  protected readonly fileTree = computed(() => {
    const files = this.manifest.value()?.files;
    if (!files) return 'Loading file list…';
    return renderTree(files.map(file => file.dest).sort());
  });

  protected readonly description =
    'A clean Angular 21 starter with the Groman2 design system: zoneless change ' +
    'detection, signal-based components, the full directive kit, Signal Forms and ' +
    'fully lazy routes. Every file is mirrored from this app, so what you download ' +
    'is exactly what you see running here.';

  protected readonly instructions = [
    'Extract the downloaded ZIP file',
    'Run npm install to install dependencies',
    'Run npm start to launch the dev server',
    'Open http://localhost:4200 in your browser'
  ];

  protected readonly quickStart = `unzip groman2-template.zip\ncd groman2-template\nnpm install\nnpm start`;

  protected async downloadTemplate(): Promise<void> {
    this.isGenerating.set(true);
    this.errorMessage.set('');
    try {
      await this.generator.generateTemplate();
      this.toasts.success('Template ready', { message: `${this.fileCount()} files zipped` });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Could not generate the template.';
      this.errorMessage.set(message);
      this.toasts.error('Download failed', { message });
    } finally {
      this.isGenerating.set(false);
    }
  }
}

/** Renders sorted paths as an ASCII tree. */
function renderTree(paths: string[]): string {
  interface Node {
    children: Map<string, Node>;
  }
  const root: Node = { children: new Map() };

  for (const path of paths) {
    let node = root;
    for (const segment of path.split('/')) {
      if (!node.children.has(segment)) node.children.set(segment, { children: new Map() });
      node = node.children.get(segment)!;
    }
  }

  const lines: string[] = ['groman2-template/'];
  const walk = (node: Node, prefix: string) => {
    const entries = [...node.children.entries()];
    entries.forEach(([name, child], index) => {
      const last = index === entries.length - 1;
      const isDir = child.children.size > 0;
      lines.push(`${prefix}${last ? '└── ' : '├── '}${name}${isDir ? '/' : ''}`);
      if (isDir) walk(child, `${prefix}${last ? '    ' : '│   '}`);
    });
  };
  walk(root, '');

  return lines.join('\n');
}
