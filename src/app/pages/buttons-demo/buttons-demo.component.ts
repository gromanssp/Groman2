import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-buttons-demo',
  templateUrl: './buttons-demo.component.html',
  styleUrl: './buttons-demo.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonsDemoComponent {

}
