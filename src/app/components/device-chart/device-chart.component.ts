import { Component, Input, OnChanges, OnDestroy } from '@angular/core';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-device-chart',
  standalone: true,
  imports: [ChartModule],
  template: `
    <p-chart
      type="line"
      [data]="chartData"
      [options]="chartOptions"
      style="width: 100%; height: 300px"
    ></p-chart>
  `,
})
export class DeviceChartComponent implements OnChanges, OnDestroy {
  @Input() devices: any[] = [];

  chartData: any = {
    labels: ['Active', 'Inactive'],
    datasets: [],
  };

  chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        stepSize: 1,
      },
    },
  };

  private intervalId?: any;

  ngOnChanges() {
    this.updateChart();

    if (this.intervalId) {
      clearInterval(this.intervalId);
    }

    this.intervalId = setInterval(() => {
      this.updateChart();
    }, 3000);
  }

  updateChart() {
    const activeCount = this.devices.filter(
      (d) => d.status === 'Active'
    ).length;
    const inactiveCount = this.devices.filter(
      (d) => d.status === 'Inactive'
    ).length;

    this.chartData = {
      labels: ['Active', 'Inactive'],
      datasets: [
        {
          label: 'Device Status Count',
          fill: false,
          borderColor: '#42A5F5',
          tension: 0.4,
          data: [activeCount, inactiveCount],
        },
      ],
    };
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
