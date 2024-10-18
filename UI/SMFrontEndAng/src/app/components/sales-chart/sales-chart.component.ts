import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sales-chart',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './sales-chart.component.html',
  styleUrls: ['./sales-chart.component.css'],
})
export class SalesChartComponent implements OnInit {
  yAxisValues: number[] = [0, 5000, 10000, 15000, 20000, 25000, 30000];
  months: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  salesData: number[] = new Array(12).fill(0);
  goalsData: number[] = new Array(12).fill(0);
  normalizedSalesData: number[] = [];
  normalizedGoalsData: number[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadMonthlyData();
  }

  loadMonthlyData() {
    const promises = this.months.map((_, index) => {
      const apiUrl = `https://swgooglesheetsapi.azurewebsites.net/SALESRANKING/${index + 1}`;
      return this.http.get<{ totalSales: string, budget: string }>(apiUrl).toPromise()
        .then(data => {
          if (data) {
            const sales = parseFloat(data.totalSales.replace(',', '')) || 0;
            const budget = parseFloat(data.budget.replace(',', '')) || 0; 

            this.salesData[index] = sales;
            this.goalsData[index] = budget;

            console.log(`Data for month ${index + 1}:`, data);
            console.log(`Sales: ${sales}, Budget: ${budget}`);
          }
        })
        .catch(error => {
          console.error(`Failed to load data for month ${index + 1}:`, error);
        });
    });

    Promise.all(promises).then(() => {
      const maxSales = Math.max(...this.salesData);
      const maxGoals = Math.max(...this.goalsData);
      const maxYValue = Math.max(maxSales, maxGoals);

      this.normalizedSalesData = this.getNormalizedData(this.salesData, maxYValue);
      this.normalizedGoalsData = this.getNormalizedData(this.goalsData, maxYValue);
    });
  }

  getNormalizedData(data: number[], maxYValue: number): number[] {
    return data.map(value => (maxYValue > 0 ? (value / maxYValue) * 100 : 0));
  }
  getYAxisValues(): number[] {
  const maxValue = Math.max(...this.salesData, ...this.goalsData);
  const step = Math.ceil(maxValue / 5000); // Skapa steg baserat på 5000
  const values = [];
  
  for (let i = 0; i <= maxValue; i += step) {
    values.push(i);
  }
  
  return values;
}
}