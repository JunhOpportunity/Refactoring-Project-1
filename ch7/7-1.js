class Organization{
  #name;
  #country;
  constructor(data) {
    this.#name = data.name;
    this.#country = data.country;
  }
  get name() {
    return this.#name;
  }
  set name(value) {
    this.#name = value;
  }

  get country() {
    return this.#country;
  }
  set country(value) {
    this.#country;
  }

  get rawData() {
    return {...this.#data}; // 얕은복사, 따라서 cloneDeep 이용하면 된다.
  }
}
const organization = new Organization({
  name: 'Acme Gooseberries',
  country: 'GB',
})


organization.name = 'Dream Coding';
console.log(organization.name);
console.log(organization.country);
