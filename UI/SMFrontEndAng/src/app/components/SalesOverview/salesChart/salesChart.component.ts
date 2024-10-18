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
      this.updateChart();
    });
  }

  updateChart() {
    // Beräkna maxvärden för y-axeln och normalisering
    const maxSales = Math.max(...this.salesData);
    const maxGoals = Math.max(...this.goalsData);
    const maxYValue = Math.max(maxSales, maxGoals);

    // Sätt y-axelvärdena baserat på ett avrundat maxvärde
    this.yAxisValues = this.getYAxisValues(maxYValue);

    // Normalisera försäljnings- och budgetdata för att matcha y-axeln
    const yAxisMaxValue = Math.max(...this.yAxisValues); // Använd maxvärdet från y-axeln
    this.normalizedSalesData = this.getNormalizedData(this.salesData, yAxisMaxValue);
    this.normalizedGoalsData = this.getNormalizedData(this.goalsData, yAxisMaxValue);
  }

  getNormalizedData(data: number[], maxYValue: number): number[] {
    return data.map(value => (maxYValue > 0 ? (value / maxYValue) * 100 : 0));
  }

  getYAxisValues(maxValue: number): number[] {
    const step = 5000; // Steg om 5000
    const maxYValue = Math.ceil(maxValue / step) * step; // T.ex. 40,000 om max är 37,460
    const values = [];

    for (let i = 0; i <= maxYValue; i += step) {
      values.push(i);
    }

    return values;
  }
}