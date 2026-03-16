import { Component } from '@angular/core';
import { Legend, plugins } from 'chart.js';
import { color } from 'chart.js/helpers';

@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.component.html',
  styleUrl: './grafico.component.css'
})
export class GraficoComponent {

  plugin = {
    id: 'customCanvasBackgroundColor',
    beforeDraw: (chart: any, args: any, options: any) => {
      const {ctx} = chart;
      ctx.save();
      ctx.globalCompositeOperation = 'destination-over';
      ctx.fillStyle = options.color || '#99ffff';
      ctx.fillRect(0, 0, chart.width, chart.height);
      ctx.restore();
    }
  };

  config = {
    type: 'doughnut',
    data: {
      labels: [
        'Red', 
        'Blue',
        'Yellow'
      ],
      datasets: [{
        label: 'My First datasets',
        data: [300, 500, 10],
        backgound: [
          'rgb(54, 162, 235)',
          'rgb(255, 99, 132)',
          'rgb(255, 205, 86)'
        ],
        hoverOffset: 4
      }],
    },
    options: {
      plugins: {
        customCanvasBackgroundColor: {
          color: 'lightGreen'
        }
      }
    },
    Legend: true,
    plugins: [this.plugin]
  }

}
