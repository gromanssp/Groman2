import { ChangeDetectionStrategy, Component, computed, input, model, output, signal } from '@angular/core';

/**
 * Drag-and-drop file picker. Emits the accepted files; uploading is left to the
 * consumer so this stays transport-agnostic.
 */
@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileUploadComponent {
  readonly label = input('Drop files here or click to browse');
  readonly accept = input('');
  readonly multiple = input(true);
  /** Maximum size per file, in megabytes. `0` disables the check. */
  readonly maxSizeMb = input(0);

  readonly files = model<readonly File[]>([]);
  readonly rejected = output<string>();

  protected readonly dragging = signal(false);
  protected readonly hasFiles = computed(() => this.files().length > 0);

  protected onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.dragging.set(true);
  }

  protected onDragLeave(): void {
    this.dragging.set(false);
  }

  protected onDrop(event: DragEvent): void {
    event.preventDefault();
    this.dragging.set(false);
    this.add(event.dataTransfer?.files);
  }

  protected onSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.add(input.files);
    input.value = '';
  }

  protected remove(index: number): void {
    this.files.update(list => list.filter((_, i) => i !== index));
  }

  protected sizeLabel(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  }

  private add(fileList: FileList | null | undefined): void {
    if (!fileList?.length) return;

    const limit = this.maxSizeMb() * 1024 * 1024;
    const accepted: File[] = [];

    for (const file of Array.from(fileList)) {
      if (limit > 0 && file.size > limit) {
        this.rejected.emit(`${file.name} exceeds ${this.maxSizeMb()} MB`);
        continue;
      }
      accepted.push(file);
    }

    if (accepted.length === 0) return;
    this.files.update(list => (this.multiple() ? [...list, ...accepted] : [accepted[0]!]));
  }
}
