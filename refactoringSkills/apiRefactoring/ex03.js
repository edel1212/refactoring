class Booking {
  constructor(show, date) {
    this._show = show;
    this._date = date;
  }

  get hasTalkback() {
    return this._show.hasOwnPropertu("talkback") && !this.isPeakDay;
  }

  get basePrice() {
    let result = this._show.price;
    if (this.isPeakDay) result += Math.round(result * 0.15);
    return result;
  }
}

class PermiumBooking extends Booking {
  constructor(show, date, extras) {
    super(show, date);
    this.extras = extras;
  }
  // Override
  get hasTalkback() {
    return this._show.hasOwnProperty("talkback");
  }
  // Override + super 메서드 Call
  get basePrice() {
    return Math.round(super.basePrice + this._extras.premiumFee);
  }

  get hasDinner() {
    return this._extras.hasOwnProperty("dinner") && !this.isPeakDay;
  }
}

/** Client 호출  */

// 클라이언트(일반 예약)..
aBooking = new Booking(show, date);

// 클라이언트(프리미엄 예약)
aPreBooking = new PermiumBooking(show, date, extras);

/// 💬 리팩터링!
{
  class Booking {
    // ... code ...

    // 👉 위임 클래스를 생성하는 함수 추가
    _bePremium(extras) {
      this._preimumDelegate = new PremiumBookingDelegate(this, extras);
    }
  } // class

  // 👉 위임 클래스 생성
  class PremiumBookingDelegate {
    consturctor(hasBooking, extras) {
      this._host = hasBooking;
      this._extras = extras;
    }

    // ⭐️ 같이 부모와 자식 오버라이드로 사용하던 클래스 가져옴
    get hasTalkback() {
      // 단 _host의 함수를 사용함
      return this._host.hasOwnProperty("talkback");
    }
  } // class

  class PermiumBooking extends Booking {
    constructor(show, date, extras) {
      super(show, date);
      this.extras = extras;
    }
    // Override
    get hasTalkback() {
      // ⭐️ 위임 함수 call
      return this._premiumDelegate.hasOwnProperty("talkback");
    }
    // Override + super 메서드 Call
    get basePrice() {
      return Math.round(super.basePrice + this._extras.premiumFee);
    }

    get hasDinner() {
      return this._extras.hasOwnProperty("dinner") && !this.isPeakDay;
    }
  } // class

  const createBooking = (show, date) => {
    return new Booking(show, date);
  };
  const createPremiumBooking = (show, date, extras) => {
    const result = new PermiumBooking(show, date, extras);
    result._bePermium(extras);
    return result;
  };
}
