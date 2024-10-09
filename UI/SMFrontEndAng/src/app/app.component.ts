import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { KeywordSalesComponent } from './components/keyword-sales/keyword-sales.component';
import { ImageDisplayComponent } from "./components/image-display/image-display.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, KeywordSalesComponent, ImageDisplayComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'SMFrontEndAng';
}
