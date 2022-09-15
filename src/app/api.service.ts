import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  private readonly api = 'https://www.cbr-xml-daily.ru/daily_json.js';

  constructor(
    private http: HttpClient
  ) {}

  exchangeRates() {
    return this.http.get(this.api);
  }

}
