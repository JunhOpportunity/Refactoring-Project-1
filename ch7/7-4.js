class Order {
  #quantity;
  #item;
  constructor(quantity, item) {
    this.#quantity = quantity;
    this.#item = item;
  }

  get basePrice() {
    return this.#quantity * this.#item.price;
  }

  get discountFactor() {
    // const discountFactor = 0.98;
    // if (basePrice > 1000) discountFactor -= 0.03;
    return basePrice > 1000 ? 0.95 : 0.98;
  }

  get price() {
    return this.basePrice * discountFactor;
  }
}
