export class Person {
  #name;
  #courses;
  constructor(name) {
    this.#name = name;
    this.#courses = [];
  }

  get name() {
    return this.#name;
  }

  get courses() {
    return [...this.#courses]; // 배열은 그 주소를 갖다주기때문에 get만으로 해두어도 가져감. 따라서 그냥 배열을 복사해서 보내주기
  }

  // set courses(courses) {
  //   this.#courses = courses;
  // }

  addCourse(course) {
    this.#courses.push(course);
  }

  removeCourse(course) {
    const index = this.#courses.indexOf(course);
    if (index === -1) return;
    this.#courses.splice(index, 1);
  }
}

export class Course {
  #name;
  #isAdvanced;
  constructor(name, isAdvanced) {
    this.#name = name;
    this.#isAdvanced = isAdvanced;
  }

  get name() {
    return this.#name;
  }

  get isAdvanced() {
    return this.#isAdvanced;
  }
}

const ellie = new Person('엘리');
ellie.courses.push(new Course('리팩토링', true)); // 이거 문제인듯
console.log(ellie.courses.length);
