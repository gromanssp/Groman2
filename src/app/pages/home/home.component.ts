import { Component } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { StatCardComponent } from '../../components/stat-card/stat-card.component';
import { BaseChartDirective } from 'ng2-charts';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    imports: [StatCardComponent, BaseChartDirective]
})
export class HomeComponent {
  // Chart Data Configurations
  public revenueChartData: ChartConfiguration<'line'>['data'] = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        data: [65, 59, 80, 81, 56, 55, 90],
        label: 'Revenue',
        fill: true,
        tension: 0.4,
        borderColor: '#6366f1',
        backgroundColor: 'rgba(99, 102, 241, 0.2)',
        pointBackgroundColor: '#8b5cf6'
      }
    ]
  };

  public revenueChartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    color: '#94a3b8',
    plugins: {
      legend: { display: false }
    },
    scales: {
      x: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#64748b' } },
      y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#64748b' } }
    }
  };

  public usersChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
    datasets: [
      {
        data: [25, 39, 30, 41, 56, 65, 40],
        label: 'Active Users',
        backgroundColor: '#10b981',
        borderRadius: 6
      }
    ]
  };
  
  public usersChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { display: false }, ticks: { color: '#64748b' } },
      y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#64748b' } }
    }
  };
  
  // Icon SVG Definitions for Stat Cards
  iconUsers = `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>`;
  iconRevenue = `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`;
  iconSales = `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>`;
  iconBounce = `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" /></svg>`;
}
