class productionPlan {
  constructor(production) {
    this._production = production;
    this._adjustments = [];
  }

  get production() {
    return this._production;
  }
  applyAdjustment(anAdjustment) {
    this._adjustments.push(anAdjustment);
    this._production += anAdjustment.amount;
  }
}

//////////////////////////////

class productionPlan {
  constructor(production) {
    this._intialProdcution = production;
    this._productionAccumulator = 0;
    this._adjustments = [];
  }

  get production() {
    return this._intialProdcution + this._productionAccumulator;
  }
}
