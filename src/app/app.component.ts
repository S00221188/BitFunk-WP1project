import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Coin } from './coin';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  coins: Coin[] = [];
  filteredCoins: Coin[] = [];
  searchQuery = '';
  apiKey = 'd855eeb0-d936-44a9-b7ea-8f5cde370ec2';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchCoins();
  }

  fetchCoins() {
    const apiUrl = 'https://api.coincap.io/v2/assets';
    this.http.get<any>(apiUrl, { headers: { 'Authorization': this.apiKey } })
      .subscribe(data => {
        this.coins = data.data;
        this.filteredCoins = [...this.coins];
      });
  }

  filterCoins() {
    this.filteredCoins = this.coins.filter(coin => coin.name.toLowerCase().includes(this.searchQuery.toLowerCase()));
  }

  resetFilter() {
    this.searchQuery = '';
    this.filteredCoins = [...this.coins];
  }
}
