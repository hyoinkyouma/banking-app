export default class {
  constructor(currency) {
    this.currency = currency;
  }
  static currency = "PHP";
  static numToFinString = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: this.currency,
  });
  static titleCase = (str) => {
    let splitStr = str.toLowerCase().split(" ");
    for (let i = 0; i < splitStr.length; i++) {
      splitStr[i] =
        splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(" ");
  };
  static covert = (amount) => {};
}
