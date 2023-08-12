# Refactoring

### 기이한 이름
- 코드는 단순하고 명료하게 작성해야한다.
- 코드를 명료하게 표한하는데 가장 중요한 요소는 바로 `이름`이다.
- 이름만 잘 지어도 문백을 파악하느라 헤매는 시간을 크게 절약 할 수 있다.

### 중복 코드
- 똑같은 코드 구조가 여러 곳에서 번복 된다면 하나로 통합혀야 더 나은 프로그램을 만들 수 있다
  - 같은 코드가 3번 이상 반복 되면 그 코드는 하나의 메서드로 만들어 사용해주자
- 한 클래스에 딸린 두 메서드가 똑같은 표현식을 사용하는 경우 `함수 추출하기`를 써서 양쪽 모두 추출된 메서드를 호출하게 바꾸자
- 코드가 비슷하긴 한데 완전히 똑같지 않다면 `문장 슬라이드하기`로 비슷한 부분을 한곳에 모아 함수 추출하기를 더 쉽게 적용할 수 있는지 확인해 보자

### 긴 함수
- 오랜 기간 잘 활용돠는 프로그램들의 코드 들은 하나 같이 `짧은 함수`로 구성되어 있다.
  - 내부 로직에는 연산하는 부분이 하나도 없어 보인다.
    - 코드가 끝 없이 위임 하는 방시긍로 작성되어 있기 떄문이다.
- `간접 호출의 효과` : 코드를 이해, 공유, 선택하기 쉬워진다는 장접은 장점은 함수를 짧게 구성할 떄 나오는 것이다.
- 여기서도 짧은 함수로 구성된 코드를 이해하기 쉽게 만드는 가장 쉽고 확실한 방법은 `이름을 잘 지어두기`이다.
  - 함수 이름은 동장 방식이 아닌 `의도`가 잘들어나게 지어야한다.
- 원래 코드보다 길어지도라도 함수 단위로 `쪼개`어서 구현 후 의도에 맞게 이름을 지어 주자.
- 함수를 짧게 만드는 작업의 99%는 `함수 추출하기`이다.
  - 함수 본문에서 따로 묶어서 뺴낼 수 있는 코드 덩어리를 찾아 `새로운 함수를 만드`는 것이다.
- 리팩토링 대상의 함수가 매개변수와 임시 변수를 많이 사용한다면 함수를 추출하는데 어려울 수 있는데 이럴 땐 `매개변수를 객체로 만들기` 와 `그 객체 통쨰로 넘기기`를 사용하자
- 추출할 코드 덩어리 찾는 방법은?
  - 주석을 위주로 찾자 `주석이 달려있는 코드는` 코드만으로 이해하기 어렵기에 달려있을 확률이 높기 떄문이다.
    - 주석을 기준으로 만들어진 메서드의 경우 메서드 명은 주석명을 기반으로 작성해주자.
    - 코드가 단 한줄일 경우에도 설명할 필요가 있다면 함수로 추출하는 게 좋다.
  - 조건문이나 반복문의 경우에도 사용할 수 있다.
    - switch문
      - 거대한 switch의 경우 case문 마다 `함수를 추출`을 적용해서 각 case의 본문을 함수 호출문 하나로 변경 한다.
      - 같은 조건을 기준으로 나뉘는 switch문이 여러 개라면 `조건부 로직을 다형성`으로 바꿔주자.
    - 반복문
      - 반복문 내부의 로직이 길어 진다면 독립된 함수로 추출하여 생성한다.


### 긴 매개변수 목록
- 매개변수 목록이 길어지면 그 자체로 이해하가 어려우므로 리팰토링 해줄 필요가 있다.
- 다른 매개 변수에서 값을 얻어 와야하는 매개 변수가 있는데 이런 경우 `매개변수를 질의 함수 바꾸기`로 제거 할 수 있다.
```javscript
// 👎 원래 코드
class ComedyCalculator extends PerformanceCalculator {
  get amount() {
    let result = 30000;
    if (this.performance.audience > 20) {
      result += 10000 + 500 * (this.performance.audience - 20);
    }
    result += 300 * this.performance.audience;
    return result;
  }
}

/*************************************************************************************/
/*************************************************************************************/
/*************************************************************************************/

// 👍 매개변수를 질의 함수로 바꿈 
class ComedyCalculator extends PerformanceCalculator {
  get amount() {
    return 30000 + this.bonusAmount;
  }

  get bonusAmount() {
    return this.overThresholdAmount + this.perAudienceAmount;
  }

  get overThresholdAmount() {
   // 👉 if (this.performance.audience > 20) 대체 가능 이유는 20 보다 큰지 확인 하는 것이기 떄문 생각해보면 당연한것 !
    return Math.max(this.performance.audience - 20, 0) * 500;
  }

  get perAudienceAmount() {
    return 300 * this.performance.audience;
  }
}
```
- 사용 중인 데이터 구조에서 값들을 뽑아서 각가의 별개의 매개변수를 전달하는 코드라면 `객체 통째로 넘기기`를 적용해서 원본 데이터 구조를 그대로 전달한다.
- 항상 함께 전달되는 매개변수들의 그룹이 있다면 해댕 목록의 변수들을 `매개변수 객체 만들기`를 사용해주자
- 함수의 동장 방식을 정하는 플래그 역할의 매개변수는 `플래그 인수 제거하기`로 없애준다.
  - 코드를 이해하기 어려워지기 때문 이럴 경우 메서드를 `2개로 나눠서` 사용해주는것이 더욱 가독성이 높디.
```javascript
// 👎 원래 코드
function calculateTotal(amount, applyDiscount) {
  if (applyDiscount) {
    // 할인을 적용하는 로직
    return amount * 0.9;
  } else {
    return amount;
  }
}
        
/*************************************************************************************/
/*************************************************************************************/
/*************************************************************************************/

// 👍 메서드를 분리함
function calculateTotalWithoutDiscount(amount) {
  return amount;
}

function calculateTotalWithDiscount(amount) {
  return amount * 0.9;
}
```
- 클래스를 활용 하는 것도 매개변수 목록을 줄이는데 효적인 수단이다.
  - 여러 개의 함수가 특정 매개변수들의 값을 공통적으로 사용할 경우 `여러 함수를 클래스로 묶어` 사용해 주자.
```javascript
// 👎 원래 코드
function calculateTotalWithDiscount(amount, applyDiscount) {
  let total = amount;
  if (applyDiscount) {
    total *= 0.9;
  }
  return total;
}

function calculateTax(amount, taxRate) {
  return amount * (taxRate / 100);
}

function calculateFinalPrice(amount, applyDiscount, taxRate) {
  const total = calculateTotalWithDiscount(amount, applyDiscount);
  const tax = calculateTax(total, taxRate);
  return total + tax;
}
        
/*************************************************************************************/
/*************************************************************************************/
/*************************************************************************************/

// 👍 PricingCalculator 클래스로 묶어 생성자들 통해 주입 받아 사용함
class PricingCalculator {
  constructor(amount, applyDiscount, taxRate) {
    this.amount = amount;
    this.applyDiscount = applyDiscount;
    this.taxRate = taxRate;
  }

  calculateTotalWithDiscount() {
    let total = this.amount;
    if (this.applyDiscount) {
      total *= 0.9;
    }
    return total;
  }

  calculateTax() {
    return this.amount * (this.taxRate / 100);
  }

  calculateFinalPrice() {
    const total = this.calculateTotalWithDiscount();
    const tax = this.calculateTax();
    return total + tax;
  }
}
```