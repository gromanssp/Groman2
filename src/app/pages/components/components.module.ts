import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ComponentsRoutingModule } from './components-routing.module';
import { ComponentsPageComponent } from './components.component';
import { ButtonsSectionComponent } from './sections/buttons-section/buttons-section.component';
import { ButtonGroupsSectionComponent } from './sections/button-groups-section/button-groups-section.component';
import { BadgesSectionComponent } from './sections/badges-section/badges-section.component';
import { CardsSectionComponent } from './sections/cards-section/cards-section.component';
import { CollapseSectionComponent } from './sections/collapse-section/collapse-section.component';
import { FormsSectionComponent } from './sections/forms-section/forms-section.component';
import { ModalsSectionComponent } from './sections/modals-section/modals-section.component';
import { NavsSectionComponent } from './sections/navs-section/navs-section.component';
import { ProgressSectionComponent } from './sections/progress-section/progress-section.component';
import { TablesSectionComponent } from './sections/tables-section/tables-section.component';
import { TooltipsSectionComponent } from './sections/tooltips-section/tooltips-section.component';
import { DatepickerSectionComponent } from './sections/datepicker-section/datepicker-section.component';
import { GridSectionComponent } from './sections/grid-section/grid-section.component';
import { IconsSectionComponent } from './sections/icons-section/icons-section.component';
import { SpinnerSectionComponent } from './sections/spinner-section/spinner-section.component';

@NgModule({
  declarations: [
    ComponentsPageComponent,
    ButtonsSectionComponent,
    ButtonGroupsSectionComponent,
    BadgesSectionComponent,
    CardsSectionComponent,
    CollapseSectionComponent,
    FormsSectionComponent,
    ModalsSectionComponent,
    NavsSectionComponent,
    ProgressSectionComponent,
    TablesSectionComponent,
    TooltipsSectionComponent,
    DatepickerSectionComponent,
    GridSectionComponent,
    IconsSectionComponent,
    SpinnerSectionComponent
  ],
  imports: [
    SharedModule,
    ComponentsRoutingModule
  ]
})
export class ComponentsModule {}
