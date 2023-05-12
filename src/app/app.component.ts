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
  isDropdownOpen = false;
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

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  subDropdownOpen: string = '';
  showSubDropdown(option: string) {
    this.subDropdownOpen = option;
  }
  
  hideSubDropdown() {
    this.subDropdownOpen = '';
  }
  
  searchQuery: string = '';

  onSearchQueryChange() {
    this.filteredCoins = this.coins.filter(
      coin => coin.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  sortByRank() {
    this.filteredCoins.sort((a, b) => a.rank - b.rank);
  }

  sortByRankDescending() {
    this.filteredCoins.sort((a, b) => b.rank - a.rank);
  }

  sortByPrice() {
    this.filteredCoins.sort((a, b) => a.priceUsd - b.priceUsd);
  }

  sortByPriceDescending() {
    this.filteredCoins.sort((a, b) => b.priceUsd - a.priceUsd);
  }

  sortByChange() {
    this.filteredCoins.sort((a, b) => a.changePercent24Hr - b.changePercent24Hr);
  }

  sortByChangeDescending() {
    this.filteredCoins.sort((a, b) => b.changePercent24Hr - a.changePercent24Hr);
  }
}

