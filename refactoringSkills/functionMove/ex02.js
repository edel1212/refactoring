{
  class Account {
    // 은행 이자 계산
    get bankCharge() {
      let result = 4.5;
      if (this._daysOverdrawn > 0) result += this.overdraftCharge;
      return result;
    } // get

    // 초과 인출 이자 계산
    get overdraftCharge() {
      if (this.type.isPremium) {
        const baseCharge = 10;
        if (this.daysOverdrawn <= 7) return baseCharge;
        else return baseCharge + (this.daysOverdrawn - 7) * 0.85;
      } else {
        return this.daysOverdrawn * 1.75;
      } // if -else
    } // get
  } // class
}

////////////////////////////////

class AccountType {
  constructor(type) {
    this.type = type;
  }
  overdraftCharge(daysOverdrawn) {
    if (this.type.isPremium) {
      const baseCharge = 10;
      if (this.daysOverdrawn <= 7) return baseCharge;
      else return baseCharge + (this.daysOverdrawn - 7) * 0.85;
    } else {
      return this.daysOverdrawn * 1.75;
    } // if -else
  } // get
}
