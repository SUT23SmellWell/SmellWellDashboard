import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { KeywordSalesComponent } from './components/keyword-sales/keyword-sales.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, KeywordSalesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'SMFrontEndAng';
}
