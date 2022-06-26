export default class FetchRequest {
  constructor(url) {
    this.url = url;
  }
  async goFetch() {
    return await fetch(this.url).then((data) => data.json());
  }
  async getCurrency(cb) {
    const currencies = ["usd", "jpy", "cny", "gbp", "aud", "eur", "eth", "btc"];
    this.goFetch().then((allRates) => {
      const finalRates = {};
      currencies.forEach(async (currency) => {
        finalRates[currency] = await allRates.RatePeso[currency];
      });
      cb(finalRates);
    });
  }
}
