{
  // 직접 상속 경우
  class Employee {
    constructor(name, type) {
      this._name = name;
      this._type = type;
    }
    validateType(arg) {
      // Code ... 직원 유형을 체크하는 로직
    }
    get type() {
      return this._type;
    }
    toString() {
      return `${this.name} ${this._type}`;
    }
  }

  /////

  // 💯 직접 상속일 경우 리팩터링
  class Employee {
    // 👉 타입 생성자 매개변수를 제거 후 내부 함수를 통해 타입에 맞는 생성자 생성
    constructor(name) {
      this._name = name;
    }
    // 위와 동일 한 코드 로직을 갖고 있음

    function createEmployee(){

    }
  }
}
