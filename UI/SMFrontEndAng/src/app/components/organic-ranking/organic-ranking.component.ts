import { HttpClient } from "@angular/common/http";
import { Component, OnInit, Input, OnChanges, SimpleChanges } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-organic-ranking",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./organic-ranking.component.html",
  styleUrls: ["./organic-ranking.component.css"],
})
export class OrganicRankingComponent implements OnInit, OnChanges {
  @Input() title = "Organic Ranking";
  @Input() subtitle = "Top Keywords";
  @Input() productName = "Product Name";
  @Input() productVariant = "Product Variant";
  @Input() headers: string[] = ['Keyword', 'Organic Rank', 'Rank Change', 'Total Searches', 'Clicks This Month', 'CVR', 'Sales'];
  @Input() data: any[] = []; // Definiera data som en array
  @Input() apiUrl: string = 'https://swgooglesheetsapi.azurewebsites.net/KWRANKING'; // Standard API-URL

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchData(); // Hämta data vid initialisering
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['apiUrl']) {
      this.fetchData(); // Hämta data varje gång apiUrl ändras
    }
  }

  fetchData(): void {
    this.http.get(this.apiUrl) // Använd den aktuella API-URL:en
      .subscribe({
        next: (data) => {
          this.data = data as any[]; // Bearbeta din data här
        },
        error: (error) => {
          console.error('Error fetching data', error); // Hantera fel här
        }
      });
  }
}