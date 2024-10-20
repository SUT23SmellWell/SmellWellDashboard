import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GoogleSheetService {
  private apiUrl = 'https://swgooglesheetsapi.azurewebsites.net/KWRANKING'; // Replace this URL with your own

  constructor(private http: HttpClient) { }

  getSheetData(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
