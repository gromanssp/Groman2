import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DirectivesModule } from '../directives/directives.module';
import { BadgeComponent } from './components/badge/badge.component';
import { ModalComponent } from './components/modal/modal.component';
import { CollapsePanelComponent } from './components/collapse-panel/collapse-panel.component';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { CodeSnippetComponent } from './components/code-snippet/code-snippet.component';
import { DatePickerComponent } from './components/date-picker/date-picker.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { DonationButtonComponent } from './components/donation-button/donation-button.component';

@NgModule({
  declarations: [
    BadgeComponent,
    ModalComponent,
    CollapsePanelComponent,
    ProgressBarComponent,
    DataTableComponent,
    CodeSnippetComponent,
    DatePickerComponent,
    SpinnerComponent,
    DonationButtonComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    DirectivesModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    DirectivesModule,
    BadgeComponent,
    ModalComponent,
    CollapsePanelComponent,
    ProgressBarComponent,
    DataTableComponent,
    CodeSnippetComponent,
    DatePickerComponent,
    SpinnerComponent,
    DonationButtonComponent
  ]
})
export class SharedModule {}
