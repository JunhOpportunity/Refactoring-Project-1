export class Order {
  constructor(data) {
    this.priority = data.priority;
  }
  isHighPriority() {
    return 'high' === this.priority || 'rush' === this.priority
  }
}

class Priority {
  #value;
  constructor(value) {
    if (Priority.legalValues().includes(value)){
      this.#value = value;
    } else {
      throw new Error(`${value} is invalid`)
    }
  }

  static legalValues() {
    return ['low', 'normal', 'high', 'rush'];
  }
}

const orders = [
  new Order({ priority: 'normal' }),
  new Order({ priority: 'high' }),
  new Order({ priority: 'rush' }),
];



const highPriorityCount = orders.filter(
  ((o) => o.isHighPriority())
).length;
