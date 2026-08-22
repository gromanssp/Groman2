import { Injectable, signal } from '@angular/core';

export interface TemplateFile {
  /** Path inside the served `template/` asset folder. */
  src: string;
  /** Path inside the generated ZIP. */
  dest: string;
}

export interface TemplateManifest {
  name: string;
  generatedFrom: string;
  files: TemplateFile[];
}

const TEMPLATE_ROOT = 'template';

/**
 * Builds the starter ZIP from the files under `template-src/`, which are
 * mirrored from this app's own `src/` by `scripts/sync-template.mjs`.
 *
 * Nothing here duplicates source code, so the download can never drift from the
 * app you are looking at - `npm run template:check` fails the build if it does.
 */
@Injectable({ providedIn: 'root' })
export class TemplateGeneratorService {
  /** Files zipped so far, for the progress indicator. */
  readonly processed = signal(0);
  readonly totalFiles = signal(0);

  private manifest: TemplateManifest | null = null;

  async loadManifest(): Promise<TemplateManifest> {
    if (this.manifest) return this.manifest;

    const response = await fetch(`${TEMPLATE_ROOT}/manifest.json`);
    if (!response.ok) {
      throw new Error(`Could not load the template manifest (${response.status})`);
    }

    this.manifest = (await response.json()) as TemplateManifest;
    return this.manifest;
  }

  async generateTemplate(): Promise<void> {
    const manifest = await this.loadManifest();

    this.processed.set(0);
    this.totalFiles.set(manifest.files.length);

    const { default: JSZip } = await import('jszip');
    const zip = new JSZip();

    await Promise.all(
      manifest.files.map(async file => {
        zip.file(file.dest, await this.readFile(file.src));
        this.processed.update(count => count + 1);
      })
    );

    const blob = await zip.generateAsync({ type: 'blob' });
    this.downloadBlob(blob, `${manifest.name}.zip`);
  }

  private async readFile(path: string): Promise<string> {
    const response = await fetch(`${TEMPLATE_ROOT}/${path}`);
    if (!response.ok) {
      throw new Error(`Missing template file: ${path}`);
    }
    return response.text();
  }

  private downloadBlob(blob: Blob, filename: string): void {
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = filename;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
  }
}
