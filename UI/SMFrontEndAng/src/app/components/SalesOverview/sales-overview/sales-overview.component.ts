import { Component, ViewChild } from '@angular/core';
import { SalesChartComponent } from '../salesChart/salesChart.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sales-overview',
  standalone: true,
  templateUrl: './sales-overview.component.html',
  styleUrls: ['./sales-overview.component.css'],
  imports: [SalesChartComponent, CommonModule]
})
export class SalesOverviewComponent {
  year: number = 2024;
  dropdownVisible: boolean = false;
  startMonth: number = new Date().getMonth(); // Set the start month to the current month index
  months: string[] = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  @ViewChild('salesChart') salesChart!: SalesChartComponent;

  show6Months() {
    const currentMonth = new Date().getMonth();
    this.startMonth = Math.max(0, currentMonth - 5);
    this.salesChart.displayMonths = 6;
    this.salesChart.startMonth = this.startMonth;
    this.salesChart.loadMonthlyData();
  }

  show12Months() {
    this.salesChart.displayMonths = 12;
    this.salesChart.startMonth = 0;
    this.salesChart.loadMonthlyData();
  }

  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
  }

  updateStartMonth(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.startMonth = parseInt(selectElement.value, 10);
    this.salesChart.startMonth = this.startMonth;
    this.salesChart.updateChart();
  }
}
