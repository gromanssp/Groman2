import { Component } from '@angular/core';

@Component({
  selector: 'app-forms-section',
  templateUrl: './forms-section.component.html',
  styleUrl: './forms-section.component.css'
})
export class FormsSectionComponent {
  sampleText = '';
  sampleEmail = '';
  samplePassword = '';
  sampleTextarea = '';
  sampleSelect = '';
  checkboxOne = false;
  checkboxTwo = true;
  radioValue = 'option1';

  codes = {
    textInputs: `<div class="form-group">\n    <label class="form-label">Text Input</label>\n    <input type="text" class="form-control"\n      placeholder="Enter text...">\n  </div>`,
    textareaSelect: `<textarea class="form-control" rows="3"></textarea>\n<select class="form-control">\n  <option value="1">Option One</option>\n</select>`,
    checkboxRadio: `<div class="form-check">\n  <input type="checkbox" class="form-check-input" id="c1">\n  <label class="form-check-label" for="c1">Label</label>\n</div>`,
    validation: `<input class="form-control is-valid" />\n<input class="form-control is-invalid" />`,
    disabled: `<input class="form-control" disabled />\n<select class="form-control" disabled>...</select>\n<input type="checkbox" class="form-check-input" disabled />`
  };
}
