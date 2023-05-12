export class Coin {
    name: string;
    priceUsd: number;
    changePercent24Hr: number;
    rank: number;
    symbol: string;

    constructor(name: string, priceUsd: number, rank: number, symbol: string,changePercent24Hr:number ) {
        this.name = name;
        this.priceUsd= priceUsd;
        this.rank = rank;
        this.symbol = symbol;
        this.changePercent24Hr = changePercent24Hr;
      }
}
  