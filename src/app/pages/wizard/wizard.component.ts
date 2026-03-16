import { Component } from '@angular/core';

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.css']
})
export class WizardComponent {
  currentStep = 1;

  next() {
    if (this.currentStep < 3) this.currentStep++;
  }

  prev() {
    if (this.currentStep > 1) this.currentStep--;
  }

  submit() {
    alert('Wizard Completed!');
    this.currentStep = 1; // Reset for demo
  }
}
