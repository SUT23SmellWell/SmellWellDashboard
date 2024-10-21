import { Component, OnInit, Input } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-salesChart',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './salesChart.component.html',
  styleUrls: ['./salesChart.component.css'],
})
export class SalesChartComponent implements OnInit {
  @Input() months: string[] = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  @Input() goalsData: number[] = [26, 66, 130, 130, 34, 98, 74, 66, 106, 10, 0, 0];
  @Input() salesData: number[] = [50, 114, 146, 138, 74, 82, 74, 74, 82, 82, 98, 37460.1];

  yAxisValues: number[] = [];
  normalizedSalesData: number[] = [];
  normalizedGoalsData: number[] = [];
  displayMonths: number = 12; // Track the number of months to display
  startMonth: number = 0; // Track the starting month for 6 months display

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadMonthlyData();
  }

  loadMonthlyData() {
    const startIndex = this.displayMonths === 6 ? this.startMonth : 0; // Always start from January for 12 months
    const endIndex = this.displayMonths === 6 ? startIndex + this.displayMonths : this.months.length;
    const promises = this.months.slice(startIndex, endIndex).map((_, index) => {
      const apiUrl = `https://swgooglesheetsapi.azurewebsites.net/SALESRANKING/${startIndex + index + 1}`;
      return this.http.get<{ totalSales: string, budget: string }>(apiUrl).toPromise()
        .then(data => {
          if (data) {
            const sales = parseFloat(data.totalSales.replace(',', '')) || 0;
            const budget = parseFloat(data.budget.replace(',', '')) || 0; 

            this.salesData[startIndex + index] = sales;
            this.goalsData[startIndex + index] = budget;

            console.log(`Data for month ${startIndex + index + 1}:`, data);
            console.log(`Sales: ${sales}, Budget: ${budget}`);
          }
        })
        .catch(error => {
          console.error(`Failed to load data for month ${startIndex + index + 1}:`, error);
        });
    });

    Promise.all(promises).then(() => {
      this.updateChart();
    });
  }


  updateChart() {

    // Beräkna maxvärden för y-axeln och normalisering
    const startIndex = this.displayMonths === 6 ? this.startMonth : 0; // Always start from January for 12 months
    const endIndex = this.displayMonths === 6 ? startIndex + this.displayMonths : this.salesData.length;
    const maxSales = Math.max(...this.salesData.slice(startIndex, endIndex));
    const maxGoals = Math.max(...this.goalsData.slice(startIndex, endIndex));
    const maxYValue = Math.max(maxSales, maxGoals);

    // Sätt y-axelvärdena baserat på ett avrundat maxvärde
    this.yAxisValues = this.getYAxisValues(maxYValue);

    // Normalisera försäljnings- och budgetdata för att matcha y-axeln
    const yAxisMaxValue = Math.max(...this.yAxisValues);
    this.normalizedSalesData = this.getNormalizedData(this.salesData.slice(startIndex, endIndex), yAxisMaxValue);
    this.normalizedGoalsData = this.getNormalizedData(this.goalsData.slice(startIndex, endIndex), yAxisMaxValue);
  }

  getNormalizedData(data: number[], maxYValue: number): number[] {
    return data.map(value => (maxYValue > 0 ? (value / maxYValue) * 100 : 0));
  }

  getYAxisValues(maxValue: number): number[] {
    const step = 5000;
    const maxYValue = Math.ceil(maxValue / step) * step;
    const values = [];

    for (let i = 0; i <= maxYValue; i += step) {
      values.push(i);
    }

    return values;
  }
}