import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';

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

  exchangeRatesPost(dataAp: any = null) {
    const headers = new HttpHeaders( {
      'Content-Type': 'application/json'
    });
    return this.http.post(
      this.api,
      {data: dataAp},
      { headers }
    );
  }

}
