import { Component, OnInit } from "@angular/core";
import { OrganicRankingComponent } from "../organic-ranking/organic-ranking.component";
import { CommonModule } from "@angular/common";
import { SalesOverviewComponent } from "../SalesOverview/sales-overview/sales-overview.component";
import { MonthlyBudgetTrackerComponent } from "../monthly-budget-tracker/monthly-budget-tracker.component";

@Component({
  selector: "app-keyword-sales",
  standalone: true,
  imports: [OrganicRankingComponent, CommonModule, SalesOverviewComponent, MonthlyBudgetTrackerComponent],
  templateUrl: "./keyword-sales.component.html",
  styleUrls: ["./keyword-sales.component.css"],
})
export class KeywordSalesComponent implements OnInit {
  pageTitle = 'Keyword Sales Dashboard';
  productCategory = 'Smellwell Active'; // Sätt som standardkategori
  productName = 'Black Zebra'; // Sätt som standardprodukt
  productImageUrl = 'assets/Active_Original_Black_Zebra.jpg'; // Sätt standardbild
  dropdownOpen = false;

  // Lägg till apiUrl för varje produkt
  products = [
    { name: 'Black Zebra', category: 'Smellwell Active', imageUrl: 'assets/Active_Original_Black_Zebra.jpg', apiUrl: 'https://swgooglesheetsapi.azurewebsites.net/KWRANKING?option=1' },
    { name: 'Leopard', category: 'Smellwell Active', imageUrl: 'assets/Active_Original_Leo.jpg', apiUrl: 'https://swgooglesheetsapi.azurewebsites.net/KWRANKING?option=2' },
    { name: 'Product Floral', category: 'Smellwell Active', imageUrl: 'assets/Active_Original_Fresh_Floral.jpg', apiUrl: 'https://swgooglesheetsapi.azurewebsites.net/KWRANKING' },
  ];

  filteredProducts = [...this.products];
  currentApiUrl: string = this.products[0].apiUrl; // Initiera med första produktens API-URL

  constructor() {}

  ngOnInit(): void {
    // Ingen ändring behövs här, eftersom standardvärdena redan har satts
  }

  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

  filterFunction(): void {
    const input = (document.getElementById('myInput') as HTMLInputElement).value.toLowerCase();
    this.filteredProducts = this.products.filter(product => product.name.toLowerCase().includes(input));
  }

  selectProduct(product: { name: string; category: string; imageUrl: string; apiUrl: string }): void {
    this.productName = product.name;
    this.productCategory = product.category;
    this.productImageUrl = product.imageUrl; // Uppdatera bild-URL
    this.currentApiUrl = product.apiUrl; // Uppdatera den aktuella API-URL:en
    this.dropdownOpen = false;
  }
}