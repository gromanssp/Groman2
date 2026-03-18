import { Routes } from '@angular/router';
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
import { CarouselSectionComponent } from './sections/carousel-section/carousel-section.component';

export const COMPONENTS_ROUTES: Routes = [
  {
    path: '',
    component: ComponentsPageComponent,
    children: [
      { path: '', redirectTo: 'buttons', pathMatch: 'full' },
      { path: 'buttons', component: ButtonsSectionComponent },
      { path: 'button-groups', component: ButtonGroupsSectionComponent },
      { path: 'badges', component: BadgesSectionComponent },
      { path: 'cards', component: CardsSectionComponent },
      { path: 'carousel', component: CarouselSectionComponent },
      { path: 'collapse', component: CollapseSectionComponent },
      { path: 'forms', component: FormsSectionComponent },
      { path: 'modals', component: ModalsSectionComponent },
      { path: 'navs', component: NavsSectionComponent },
      { path: 'progress', component: ProgressSectionComponent },
      { path: 'tables', component: TablesSectionComponent },
      { path: 'tooltips', component: TooltipsSectionComponent },
      { path: 'datepicker', component: DatepickerSectionComponent },
      { path: 'grid', component: GridSectionComponent },
      { path: 'icons', component: IconsSectionComponent },
      { path: 'spinners', component: SpinnerSectionComponent }
    ]
  }
];
