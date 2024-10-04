import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SheetsComponent } from "./components/sheets/sheets.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SheetsComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SMFrontEndAng';
}
