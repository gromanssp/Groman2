import { Component } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.css'
})
export class ChartsComponent {
  private baseOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    color: '#94a3b8',
    plugins: { legend: { labels: { color: '#94a3b8' } } },
    scales: {
      x: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#64748b' } },
      y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#64748b' } }
    }
  };

  private pieOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    color: '#94a3b8',
    plugins: { legend: { position: 'bottom', labels: { color: '#94a3b8', padding: 16 } } }
  };

  // Line Chart
  lineData: ChartConfiguration<'line'>['data'] = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        data: [30, 45, 42, 68, 55, 78, 72, 90, 85, 95, 88, 110],
        label: 'Revenue',
        fill: true,
        tension: 0.4,
        borderColor: '#6366f1',
        backgroundColor: 'rgba(99, 102, 241, 0.15)',
        pointBackgroundColor: '#6366f1'
      },
      {
        data: [20, 30, 35, 45, 40, 55, 60, 65, 70, 75, 80, 90],
        label: 'Expenses',
        fill: true,
        tension: 0.4,
        borderColor: '#8b5cf6',
        backgroundColor: 'rgba(139, 92, 246, 0.1)',
        pointBackgroundColor: '#8b5cf6'
      }
    ]
  };
  lineOptions: ChartOptions<'line'> = this.baseOptions as ChartOptions<'line'>;

  // Bar Chart
  barData: ChartConfiguration<'bar'>['data'] = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      { data: [45, 60, 55, 70, 65, 80, 50], label: 'This Week', backgroundColor: '#6366f1', borderRadius: 6 },
      { data: [35, 50, 40, 55, 60, 70, 45], label: 'Last Week', backgroundColor: 'rgba(99, 102, 241, 0.3)', borderRadius: 6 }
    ]
  };
  barOptions: ChartOptions<'bar'> = this.baseOptions as ChartOptions<'bar'>;

  // Doughnut Chart
  doughnutData: ChartConfiguration<'doughnut'>['data'] = {
    labels: ['Desktop', 'Mobile', 'Tablet', 'Other'],
    datasets: [{
      data: [45, 30, 18, 7],
      backgroundColor: ['#6366f1', '#8b5cf6', '#10b981', '#f59e0b'],
      borderWidth: 0,
      hoverOffset: 8
    }]
  };
  doughnutOptions: ChartOptions<'doughnut'> = this.pieOptions as ChartOptions<'doughnut'>;

  // Radar Chart
  radarData: ChartConfiguration<'radar'>['data'] = {
    labels: ['Speed', 'Reliability', 'Comfort', 'Safety', 'Efficiency', 'Design'],
    datasets: [
      {
        data: [85, 90, 78, 92, 88, 75],
        label: 'Product A',
        borderColor: '#6366f1',
        backgroundColor: 'rgba(99, 102, 241, 0.2)',
        pointBackgroundColor: '#6366f1'
      },
      {
        data: [70, 82, 90, 78, 72, 88],
        label: 'Product B',
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.2)',
        pointBackgroundColor: '#10b981'
      }
    ]
  };
  radarOptions: ChartOptions<'radar'> = {
    responsive: true,
    maintainAspectRatio: false,
    color: '#94a3b8',
    plugins: { legend: { labels: { color: '#94a3b8' } } },
    scales: {
      r: {
        grid: { color: 'rgba(255,255,255,0.08)' },
        angleLines: { color: 'rgba(255,255,255,0.08)' },
        ticks: { color: '#64748b', backdropColor: 'transparent' },
        pointLabels: { color: '#94a3b8' }
      }
    }
  };

  // Polar Area Chart
  polarData: ChartConfiguration<'polarArea'>['data'] = {
    labels: ['Social', 'Search', 'Direct', 'Referral', 'Email'],
    datasets: [{
      data: [35, 28, 20, 12, 5],
      backgroundColor: [
        'rgba(99, 102, 241, 0.7)',
        'rgba(139, 92, 246, 0.7)',
        'rgba(16, 185, 129, 0.7)',
        'rgba(245, 158, 11, 0.7)',
        'rgba(239, 68, 68, 0.7)'
      ],
      borderWidth: 0
    }]
  };
  polarOptions: ChartOptions<'polarArea'> = {
    responsive: true,
    maintainAspectRatio: false,
    color: '#94a3b8',
    plugins: { legend: { position: 'bottom', labels: { color: '#94a3b8', padding: 16 } } },
    scales: {
      r: {
        grid: { color: 'rgba(255,255,255,0.08)' },
        ticks: { color: '#64748b', backdropColor: 'transparent' }
      }
    }
  };

  // Bubble Chart
  bubbleData: ChartConfiguration<'bubble'>['data'] = {
    datasets: [
      {
        data: [
          { x: 20, y: 30, r: 15 },
          { x: 40, y: 10, r: 10 },
          { x: 15, y: 50, r: 20 }
        ],
        label: 'Product A',
        backgroundColor: 'rgba(99, 102, 241, 0.5)',
        borderColor: '#6366f1'
      },
      {
        data: [
          { x: 30, y: 40, r: 12 },
          { x: 50, y: 25, r: 18 },
          { x: 10, y: 15, r: 8 }
        ],
        label: 'Product B',
        backgroundColor: 'rgba(16, 185, 129, 0.5)',
        borderColor: '#10b981'
      }
    ]
  };
  bubbleOptions: ChartOptions<'bubble'> = this.baseOptions as ChartOptions<'bubble'>;
}
