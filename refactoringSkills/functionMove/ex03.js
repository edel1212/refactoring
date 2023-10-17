{
  class Customer {
    constructor(name, discountRate) {
      this._name = name;
      this._discountRate = discountRate;
      this._contract = new CustomerContract(dateToday());
    }
    get discountRate() {
      return this._discountRate;
    }
    becomePreferred() {
      this._discountRate += 0.03;
      // do something
    }
    applyDiscount(amount) {
      return amount.subtract(amount.multiply(this._discountRate));
    }
  }

  class CustomerContract {
    constructor(startDate) {
      this._startDate = startDate;
    }
  }
}

////////////////////////////
////////////////////////////
////////////////////////////

class Customer {
  constructor(name, discountRate) {
    this._name = name;
    this._setDiscountRate(discountRate);
    this._contract = new CustomerContract(dateToday());
  }

  get discountRate() {
    return this._contract.discountRate;
  }
  // 👉 _discountRate값을 set 해주는 함수 추가
  _setDiscountRate(aNumber) {
    this._contract.discountRate = aNumber;
  }
  becomePreferred() {
    // 👉 값 지정이 아닌 함수로 변경
    _setDiscountRate(discountRate + 0.03);
    // do something
  }
  applyDiscount(amount) {
    return amount.subtract(amount.multiply(this.discountRate));
  }
}

class CustomerContract {
  constructor(startDate, discountRate) {
    this._startDate = startDate;
    this._discountRate = discountRate;
  }

  get discountRate() {
    return this._discountRate;
  }
  set discountRate(arg) {
    this._discountRate = arg;
  }
}
