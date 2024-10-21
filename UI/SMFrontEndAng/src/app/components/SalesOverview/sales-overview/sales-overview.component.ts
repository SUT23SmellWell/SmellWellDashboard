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
  startMonth: number = 0; // Default to the first month
  months: string[] = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  @ViewChild('salesChart') salesChart!: SalesChartComponent;

  show6Months() {
    const currentMonth = new Date().getMonth();
    this.startMonth = Math.max(0, currentMonth - 5); // Calculate the start month for the latest 6 months
    console.log('Showing 6 months'); // Add this line for debugging
    this.salesChart.displayMonths = 6;
    this.salesChart.startMonth = this.startMonth;
    this.salesChart.loadMonthlyData();
  }

  show12Months() {
    console.log('Showing 12 months'); // Add this line for debugging
    this.salesChart.displayMonths = 12;
    this.salesChart.startMonth = 0; // Reset start month to 0 for 12 months
    this.salesChart.loadMonthlyData();
  }

  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
  }

  updateStartMonth(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.startMonth = parseInt(selectElement.value, 10);
    this.salesChart.startMonth = this.startMonth; // Update the start month in the sales chart
    this.salesChart.updateChart(); // Update the chart immediately after selecting the start month
  }
}