export default class {
  constructor(currency) {
    this.currency = currency;
  }
  static currency = "PHP";
  static numToFinString = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: this.currency,
  });
}
