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
  normalizedSalesData!: number[];
  normalizedGoalsData!: number[];

  rawSalesData: number[] = [12000, 15000, 18000, 20000, 22000, 25000, 27000, 30000, 28000, 26000, 24000, 22000];
  rawGoalsData: number[] = [10000, 14000, 16000, 19000, 21000, 23000, 25000, 27000, 26000, 24000, 22000, 20000];

  ngOnInit() {
    this.normalizedSalesData = this.normalizeData(this.rawSalesData);
    this.normalizedGoalsData = this.normalizeData(this.rawGoalsData);
  }

  normalizeData(data: number[]): number[] {
    const max = Math.max(...data);
    return data.map(value => (value / max) * 100);
  }
}