import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { KeywordSalesComponent } from './components/keyword-sales/keyword-sales.component';
import { ImageDisplayComponent } from "./components/image-display/image-display.component";
import { BuilderPage } from './components/builder-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, KeywordSalesComponent, ImageDisplayComponent, BuilderPage],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SMFrontEndAng';
}
