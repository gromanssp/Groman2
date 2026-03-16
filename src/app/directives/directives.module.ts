import { NgModule } from '@angular/core';
import { TooltipDirective } from './tooltip.directive';
import { CollapseDirective } from './collapse.directive';

@NgModule({
  declarations: [
    TooltipDirective,
    CollapseDirective
  ],
  exports: [
    TooltipDirective,
    CollapseDirective
  ]
})
export class DirectivesModule {}
