import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Toast } from '../../../services/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css',
  host: { role: 'status', '[attr.aria-live]': '"polite"' },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToastComponent {
  readonly toast = input.required<Toast>();
  readonly dismissed = output<string>();
}
