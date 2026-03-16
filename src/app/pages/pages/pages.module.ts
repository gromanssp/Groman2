import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraficoComponent } from '../grafico/grafico.component';
import { BaseChartDirective } from 'ng2-charts';



@NgModule({
  declarations: [
    GraficoComponent
  ],
  imports: [
    CommonModule,
    BaseChartDirective
  ],
  exports: [
    GraficoComponent
  ]
})
export class PagesModule { }
